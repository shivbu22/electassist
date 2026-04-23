// ElectAssist — Google Calendar Service
// One-click Google Calendar event creation for election dates (FR-10)

class CalendarService {
  constructor() {
    this.CLIENT_ID = ""; // Set via config
    this.SCOPES = "https://www.googleapis.com/auth/calendar.events";
    this.tokenClient = null;
    this.gapiInited = false;
    this.gisInited = false;
    this.accessToken = null;
  }

  // Load Google API client
  async loadGapiClient() {
    return new Promise((resolve) => {
      if (window.gapi) { resolve(); return; }
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.onload = () => {
        window.gapi.load("client", async () => {
          await window.gapi.client.init({
            discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
          });
          this.gapiInited = true;
          resolve();
        });
      };
      document.head.appendChild(script);
    });
  }

  // Load Google Identity Services
  async loadGisClient(clientId) {
    return new Promise((resolve) => {
      if (!clientId) { resolve(); return; }
      this.CLIENT_ID = clientId;
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.onload = () => {
        this.tokenClient = window.google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope: this.SCOPES,
          callback: (response) => {
            if (response.access_token) {
              this.accessToken = response.access_token;
            }
          }
        });
        this.gisInited = true;
        resolve();
      };
      document.head.appendChild(script);
    });
  }

  // Trigger OAuth token request
  async requestToken() {
    return new Promise((resolve, reject) => {
      if (!this.tokenClient) {
        reject(new Error("Calendar OAuth not configured. Using ICS download instead."));
        return;
      }
      this.tokenClient.callback = (response) => {
        if (response.error) {
          reject(new Error(response.error));
          return;
        }
        this.accessToken = response.access_token;
        window.gapi.client.setToken({ access_token: this.accessToken });
        resolve(this.accessToken);
      };
      this.tokenClient.requestAccessToken({ prompt: "" });
    });
  }

  // Create a calendar event via Google Calendar API
  async createCalendarEvent(title, description, date, allDay = true) {
    try {
      await this.loadGapiClient();
      if (!this.accessToken) {
        await this.requestToken();
      }

      const eventDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);

      const event = {
        summary: `🗳️ ${title}`,
        description: `${description}\n\nAdded by ElectAssist — Your Election Guide`,
        start: allDay
          ? { date: eventDate.toISOString().split("T")[0] }
          : { dateTime: eventDate.toISOString() },
        end: allDay
          ? { date: endDate.toISOString().split("T")[0] }
          : { dateTime: new Date(eventDate.getTime() + 3600000).toISOString() },
        reminders: {
          useDefault: false,
          overrides: [
            { method: "popup", minutes: 1440 }, // 1 day before
            { method: "popup", minutes: 60 }    // 1 hour before
          ]
        },
        colorId: "7" // Peacock blue
      };

      const response = await window.gapi.client.calendar.events.insert({
        calendarId: "primary",
        resource: event
      });

      return { success: true, eventLink: response.result.htmlLink };
    } catch (error) {
      // Fallback: ICS download
      return this.downloadICS(title, description, date);
    }
  }

  // ICS fallback (works without OAuth)
  downloadICS(title, description, date) {
    const eventDate = new Date(date);
    const dateStr = eventDate.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const tomorrow = new Date(eventDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//ElectAssist//Election Guide//EN",
      "BEGIN:VEVENT",
      `DTSTART:${dateStr}`,
      `DTEND:${tomorrowStr}`,
      `SUMMARY:🗳️ ${title}`,
      `DESCRIPTION:${description.replace(/\n/g, "\\n")} | Added by ElectAssist`,
      `STATUS:CONFIRMED`,
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.replace(/\s+/g, "_")}_ElectAssist.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    return { success: true, method: "ics", message: "Calendar file downloaded!" };
  }

  // Create a Google Calendar deep link (always works, opens Calendar in browser)
  getCalendarLink(title, description, date) {
    const start = new Date(date).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    const end = new Date(new Date(date).getTime() + 86400000)
      .toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: `🗳️ ${title}`,
      details: `${description}\n\nAdded by ElectAssist`,
      dates: `${start}/${end}`,
      sf: "true",
      output: "xml"
    });

    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }
}

export { CalendarService };
