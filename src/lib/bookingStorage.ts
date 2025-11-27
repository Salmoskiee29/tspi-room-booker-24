import { Booking } from "@/types/booking";

// In-memory storage for bookings (placeholder for database)
let bookings: Booking[] = [];

export const bookingAPI = {
  // GET /bookings?room=roomID&date=YYYY-MM-DD
  getBookings: async (roomId?: string, date?: string): Promise<Booking[]> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    let filtered = [...bookings];

    if (roomId) {
      filtered = filtered.filter((b) => b.roomId === roomId);
    }

    if (date) {
      filtered = filtered.filter((b) => b.date === date);
    }

    return filtered;
  },

  // POST /check-conflict
  checkConflict: async (
    roomId: string,
    date: string,
    startTime: string,
    endTime: string,
    excludeId?: string
  ): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    const roomBookings = bookings.filter(
      (b) => b.roomId === roomId && b.date === date && b.id !== excludeId
    );

    // Check for time overlap
    for (const booking of roomBookings) {
      const bookingStart = booking.startTime;
      const bookingEnd = booking.endTime;

      // Check if times overlap
      if (
        (startTime >= bookingStart && startTime < bookingEnd) ||
        (endTime > bookingStart && endTime <= bookingEnd) ||
        (startTime <= bookingStart && endTime >= bookingEnd)
      ) {
        return true; // Conflict found
      }
    }

    return false; // No conflict
  },

  // POST /book
  createBooking: async (booking: Omit<Booking, "id" | "createdAt">): Promise<Booking> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    const newBooking: Booking = {
      ...booking,
      id: `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };

    bookings.push(newBooking);
    return newBooking;
  },

  // DELETE /booking/:id
  deleteBooking: async (id: string): Promise<void> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 100));

    bookings = bookings.filter((b) => b.id !== id);
  },

  // For testing - populate with sample data
  seedData: () => {
    const today = new Date().toISOString().split("T")[0];
    bookings = [
      {
        id: "sample-1",
        name: "John Doe",
        email: "john@tspi.com",
        department: "Engineering",
        roomId: "tspi-east",
        date: today,
        startTime: "09:00",
        endTime: "10:00",
        meetingTitle: "Team Standup",
        createdAt: new Date().toISOString(),
      },
      {
        id: "sample-2",
        name: "Jane Smith",
        email: "jane@tspi.com",
        department: "HR",
        roomId: "tspi-east",
        date: today,
        startTime: "14:00",
        endTime: "15:30",
        meetingTitle: "Interview Session",
        createdAt: new Date().toISOString(),
      },
    ];
  },
};

// Initialize with some sample data
bookingAPI.seedData();
