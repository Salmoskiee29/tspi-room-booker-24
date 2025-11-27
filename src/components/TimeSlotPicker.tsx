import { format } from "date-fns";
import { Booking } from "@/types/booking";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

interface TimeSlotPickerProps {
  date: Date;
  bookings: Booking[];
  onSelectTime: (startTime: string, endTime: string) => void;
}

const TIME_SLOTS = [
  { start: "08:00", end: "09:00", label: "8:00 AM - 9:00 AM" },
  { start: "09:00", end: "10:00", label: "9:00 AM - 10:00 AM" },
  { start: "10:00", end: "11:00", label: "10:00 AM - 11:00 AM" },
  { start: "11:00", end: "12:00", label: "11:00 AM - 12:00 PM" },
  { start: "12:00", end: "13:00", label: "12:00 PM - 1:00 PM" },
  { start: "13:00", end: "14:00", label: "1:00 PM - 2:00 PM" },
  { start: "14:00", end: "15:00", label: "2:00 PM - 3:00 PM" },
  { start: "15:00", end: "16:00", label: "3:00 PM - 4:00 PM" },
  { start: "16:00", end: "17:00", label: "4:00 PM - 5:00 PM" },
  { start: "17:00", end: "18:00", label: "5:00 PM - 6:00 PM" },
];

export const TimeSlotPicker = ({ date, bookings, onSelectTime }: TimeSlotPickerProps) => {
  const dateStr = format(date, "yyyy-MM-dd");

  const isSlotOccupied = (startTime: string, endTime: string) => {
    return bookings.some((booking) => {
      if (booking.date !== dateStr) return false;

      const bookingStart = booking.startTime;
      const bookingEnd = booking.endTime;

      return (
        (startTime >= bookingStart && startTime < bookingEnd) ||
        (endTime > bookingStart && endTime <= bookingEnd) ||
        (startTime <= bookingStart && endTime >= bookingEnd)
      );
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-muted-foreground" />
        <h3 className="font-semibold">Available Time Slots</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {TIME_SLOTS.map((slot) => {
          const occupied = isSlotOccupied(slot.start, slot.end);
          return (
            <button
              key={slot.start}
              onClick={() => !occupied && onSelectTime(slot.start, slot.end)}
              disabled={occupied}
              className={cn(
                "p-3 rounded-lg border text-sm font-medium transition-all",
                occupied
                  ? "bg-destructive/10 border-destructive/50 text-destructive cursor-not-allowed"
                  : "bg-card border-border hover:border-primary hover:bg-primary/5 cursor-pointer"
              )}
            >
              <div className="flex items-center justify-between">
                <span>{slot.label}</span>
                {occupied && (
                  <span className="text-xs bg-destructive text-destructive-foreground px-2 py-1 rounded">
                    Occupied
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
