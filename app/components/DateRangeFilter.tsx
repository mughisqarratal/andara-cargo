"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarDays, ChevronDown } from "lucide-react";

interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

interface DateRangeFilterProps {
  initialStartDate?: string;
  initialEndDate?: string;
  isActive?: boolean;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

// Mengubah string YYYY-MM-DD menjadi Date lokal.
function parseDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

// Mengubah Date menjadi YYYY-MM-DD tanpa masalah timezone.
function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// Format tanggal seperti 08 Oct 2026.
function formatDisplay(date: Date | null): string {
  if (!date) return "";

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

// Membandingkan tanggal tanpa memperhatikan jam.
function dateNumber(date: Date): number {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ).getTime();
}

function sameDate(a: Date, b: Date): boolean {
  return dateNumber(a) === dateNumber(b);
}

// Menambahkan bulan.
function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1);
}

// Mengambil seluruh tanggal dalam kalender (6 baris).
function getCalendarDays(month: Date): Date[] {
  const firstDay = new Date(month.getFullYear(), month.getMonth(), 1);

  const startDay = firstDay.getDay();

  const startDate = new Date(
    month.getFullYear(),
    month.getMonth(),
    1 - startDay,
  );

  return Array.from({ length: 42 }, (_, index) => {
    return new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() + index,
    );
  });
}

// ==========================================
// KOMPONEN KALENDER
// ==========================================

interface CalendarMonthProps {
  month: Date;
  range: DateRange;
  today: Date;
  minYear: number;
  maxYear: number;
  onSelect: (date: Date) => void;
  onMonthChange: (month: number) => void;
  onYearChange: (year: number) => void;
}

function CalendarMonth({
  month,
  range,
  today,
  minYear,
  maxYear,
  onSelect,
  onMonthChange,
  onYearChange,
}: CalendarMonthProps) {
  const days = getCalendarDays(month);

  return (
    <div className="flex-1 min-w-0">
      {/* HEADER BULAN DAN TAHUN */}
      <div className="flex items-center justify-between px-2 mb-3">
        <div className="flex items-center gap-2">
          {/* PILIH BULAN */}
          <div className="relative">
            <select
              value={month.getMonth()}
              onChange={(e) => onMonthChange(Number(e.target.value))}
              className="
                appearance-none
                bg-transparent
                text-sm font-semibold
                text-gray-800
                pl-1 pr-6 py-1
                rounded
                cursor-pointer
                outline-none
                hover:bg-gray-100
              "
            >
              {MONTHS.map((name, index) => (
                <option key={name} value={index}>
                  {name}
                </option>
              ))}
            </select>

            <ChevronDown
              size={14}
              className="
                absolute right-1 top-1/2
                -translate-y-1/2
                text-gray-500
                pointer-events-none
              "
            />
          </div>

          {/* PILIH TAHUN */}
          <div className="relative">
            <select
              value={month.getFullYear()}
              onChange={(e) => onYearChange(Number(e.target.value))}
              className="
                appearance-none
                bg-transparent
                text-sm font-semibold
                text-gray-800
                pl-1 pr-6 py-1
                rounded
                cursor-pointer
                outline-none
                hover:bg-gray-100
              "
            >
              {Array.from(
                { length: maxYear - minYear + 1 },
                (_, index) => maxYear - index,
              ).map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <ChevronDown
              size={14}
              className="
                absolute right-1 top-1/2
                -translate-y-1/2
                text-gray-500
                pointer-events-none
              "
            />
          </div>
        </div>
      </div>

      {/* NAMA HARI */}
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map((day) => (
          <div
            key={day}
            className="
              h-8
              flex items-center justify-center
              text-xs font-bold
              text-gray-800
            "
          >
            {day}
          </div>
        ))}
      </div>

      {/* TANGGAL */}
      <div className="grid grid-cols-7">
        {days.map((date, index) => {
          const isCurrentMonth = date.getMonth() === month.getMonth();

          const isStart = range.startDate && sameDate(date, range.startDate);

          const isEnd = range.endDate && sameDate(date, range.endDate);

          const isSelected = Boolean(isStart || isEnd);

          const isBetween =
            range.startDate &&
            range.endDate &&
            dateNumber(date) > dateNumber(range.startDate) &&
            dateNumber(date) < dateNumber(range.endDate);

          const isFuture = dateNumber(date) > dateNumber(today);

          return (
            <button
              key={index}
              type="button"
              disabled={isFuture}
              onClick={() => onSelect(date)}
              className={`
                relative
                h-10.5
                flex items-center justify-center
                text-[13px]
                transition-colors

                ${!isCurrentMonth ? "text-gray-300" : "text-gray-800"}

                ${isBetween ? "bg-[#f2f2f2]" : ""}

                ${isSelected ? "bg-[#f2f2f2]" : ""}

                ${
                  isFuture
                    ? "cursor-not-allowed text-gray-300"
                    : "cursor-pointer"
                }

                ${!isSelected && !isFuture ? "hover:bg-gray-100" : ""}
              `}
            >
              <span
                className={`
                  relative z-10
                  w-7.5 h-7.5
                  flex items-center justify-center
                  rounded-full

                  ${isSelected ? "bg-[#171717] text-white font-semibold" : ""}

                  ${sameDate(date, today) && !isSelected ? "font-bold" : ""}
                `}
              >
                {date.getDate()}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ==========================================
// KOMPONEN UTAMA DATE RANGE FILTER
// ==========================================

export default function DateRangeFilter({
  initialStartDate = "",
  initialEndDate = "",
  isActive = false,
}: DateRangeFilterProps) {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);

  // TANGGAL HARI INI
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const currentYear = today.getFullYear();
  const minYear = currentYear - 20;

  // STATUS POPUP
  const [isOpen, setIsOpen] = useState(false);

  // TANGGAL YANG SUDAH DITERAPKAN
  const [appliedRange, setAppliedRange] = useState<DateRange>({
    startDate: initialStartDate ? parseDate(initialStartDate) : null,
    endDate: initialEndDate ? parseDate(initialEndDate) : null,
  });

  // TANGGAL SEMENTARA YANG DIPILIH
  const [draftRange, setDraftRange] = useState<DateRange>({
    startDate: initialStartDate ? parseDate(initialStartDate) : null,
    endDate: initialEndDate ? parseDate(initialEndDate) : null,
  });

  // KALENDER KIRI (START DATE)
  const [leftMonth, setLeftMonth] = useState<Date>(() => {
    const date = initialStartDate ? parseDate(initialStartDate) : today;

    return new Date(date.getFullYear(), date.getMonth(), 1);
  });

  // KALENDER KANAN (END DATE)
  // INDEPENDEN DARI KALENDER KIRI.
  const [rightMonth, setRightMonth] = useState<Date>(() => {
    const date = initialEndDate
      ? parseDate(initialEndDate)
      : initialStartDate
        ? addMonths(parseDate(initialStartDate), 1)
        : addMonths(today, 1);

    return new Date(date.getFullYear(), date.getMonth(), 1);
  });

  // ==========================================
  // SINKRONISASI DENGAN URL
  // ==========================================

  useEffect(() => {
    const start = initialStartDate ? parseDate(initialStartDate) : null;

    const end = initialEndDate ? parseDate(initialEndDate) : null;

    setAppliedRange({
      startDate: start,
      endDate: end,
    });

    setDraftRange({
      startDate: start,
      endDate: end,
    });

    const left = start || today;
    const right = end || addMonths(left, 1);

    setLeftMonth(new Date(left.getFullYear(), left.getMonth(), 1));

    setRightMonth(new Date(right.getFullYear(), right.getMonth(), 1));
  }, [initialStartDate, initialEndDate]);

  // ==========================================
  // BUKA KALENDER
  // ==========================================

  function handleOpen() {
    setDraftRange({
      startDate: appliedRange.startDate
        ? new Date(appliedRange.startDate)
        : null,

      endDate: appliedRange.endDate ? new Date(appliedRange.endDate) : null,
    });

    const left = appliedRange.startDate || today;

    const right = appliedRange.endDate
      ? appliedRange.endDate
      : addMonths(left, 1);

    setLeftMonth(new Date(left.getFullYear(), left.getMonth(), 1));

    setRightMonth(new Date(right.getFullYear(), right.getMonth(), 1));

    setIsOpen(true);
  }

  // ==========================================
  // CANCEL
  // ==========================================

  function handleCancel() {
    setDraftRange({
      startDate: appliedRange.startDate
        ? new Date(appliedRange.startDate)
        : null,

      endDate: appliedRange.endDate ? new Date(appliedRange.endDate) : null,
    });

    setIsOpen(false);
  }

  // ==========================================
  // PILIH TANGGAL
  // ==========================================

  function handleSelectDate(date: Date) {
    if (dateNumber(date) > dateNumber(today)) {
      return;
    }

    // Jika belum ada tanggal awal,
    // atau rentang sebelumnya sudah lengkap,
    // mulai memilih rentang baru.

    if (!draftRange.startDate || draftRange.endDate) {
      setDraftRange({
        startDate: date,
        endDate: null,
      });

      return;
    }

    // Jika tanggal yang dipilih lebih awal
    // daripada tanggal awal sebelumnya.

    if (dateNumber(date) < dateNumber(draftRange.startDate)) {
      setDraftRange({
        startDate: date,
        endDate: null,
      });

      return;
    }

    // Tanggal akhir berhasil dipilih.

    setDraftRange({
      startDate: draftRange.startDate,
      endDate: date,
    });
  }

  // ==========================================
  // APPLY
  // ==========================================

  function handleApply() {
    if (!draftRange.startDate || !draftRange.endDate) {
      return;
    }

    const startDate = formatDate(draftRange.startDate);

    const endDate = formatDate(draftRange.endDate);

    setAppliedRange({
      startDate: draftRange.startDate,
      endDate: draftRange.endDate,
    });

    setIsOpen(false);

    const params = new URLSearchParams();

    params.set("range", "custom");
    params.set("startDate", startDate);
    params.set("endDate", endDate);

    router.push(`/dashboard/admin/report?${params.toString()}`);
  }

  // ==========================================
  // NAVIGASI BULAN KALENDER
  // ==========================================

  function changeMonth(panelIndex: number, selectedMonth: number) {
    const current = panelIndex === 0 ? leftMonth : rightMonth;

    const updated = new Date(current.getFullYear(), selectedMonth, 1);

    if (panelIndex === 0) {
      setLeftMonth(updated);
    } else {
      setRightMonth(updated);
    }
  }

  // ==========================================
  // NAVIGASI TAHUN KALENDER
  // ==========================================

  function changeYear(panelIndex: number, selectedYear: number) {
    const current = panelIndex === 0 ? leftMonth : rightMonth;

    const updated = new Date(selectedYear, current.getMonth(), 1);

    if (panelIndex === 0) {
      setLeftMonth(updated);
    } else {
      setRightMonth(updated);
    }
  }

  // ==========================================
  // TUTUP KALENDER KETIKA KLIK DI LUAR
  // ==========================================

  useEffect(() => {
    if (!isOpen) return;

    function handleOutsideClick(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        handleCancel();
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        handleCancel();
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);

      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, appliedRange]);

  // ==========================================
  // FORMAT INPUT
  // ==========================================

  const displayValue =
    appliedRange.startDate && appliedRange.endDate
      ? `${formatDisplay(appliedRange.startDate)}  →  ${formatDisplay(appliedRange.endDate)}`
      : "";

  // ==========================================
  // TAMPILAN
  // ==========================================

  return (
    <div ref={wrapperRef} className="relative">
      {/* INPUT CUSTOM DATE */}

      <button
        type="button"
        onClick={() => {
          if (isOpen) {
            handleCancel();
          } else {
            handleOpen();
          }
        }}
        className={`
          w-full
          h-10.5
          flex items-center
          gap-3
          px-3
          rounded-lg
          border
          bg-white
          shadow-sm
          transition-all

          ${
            isOpen || isActive
              ? "border-gray-900 ring-2 ring-gray-900/10"
              : "border-gray-300 hover:border-gray-400"
          }
        `}
      >
        <CalendarDays size={17} className="shrink-0 text-gray-500" />

        <span
          className={`
            flex-1
            text-left
            text-[13px]
            font-medium
            whitespace-nowrap
            overflow-hidden
            text-ellipsis
            cursor-pointer

            ${displayValue ? "text-gray-800" : "text-gray-400"}
          `}
        >
          {displayValue || "Pilih Rentang Tanggal"}
        </span>

        <ChevronDown
          size={15}
          className={`
            shrink-0
            text-gray-500
            transition-transform
            ${isOpen ? "rotate-180" : ""}
          `}
        />
      </button>

      {/* POPUP KALENDER */}

      {isOpen && (
        <div
          className="
            absolute
            top-full
            right-0
            mt-2
            z-100
            w-160
            max-w-[calc(100vw-24px)]
            bg-white
            border
            border-gray-200
            rounded-xl
            shadow-[0_8px_30px_rgba(0,0,0,0.15)]
            p-4
          "
        >
          {/* DUA KALENDER BERDAMPINGAN */}

          <div
            className="
              grid
              grid-cols-2
              gap-4
              max-sm:grid-cols-1
            "
          >
            {/* KALENDER KIRI */}

            <CalendarMonth
              month={leftMonth}
              range={draftRange}
              today={today}
              minYear={minYear}
              maxYear={currentYear}
              onSelect={handleSelectDate}
              onMonthChange={(month) => changeMonth(0, month)}
              onYearChange={(year) => changeYear(0, year)}
            />

            {/* KALENDER KANAN */}

            <div
              className="
                max-sm:hidden
                border-l
                border-gray-100
                pl-4
              "
            >
              <CalendarMonth
                month={rightMonth}
                range={draftRange}
                today={today}
                minYear={minYear}
                maxYear={currentYear}
                onSelect={handleSelectDate}
                onMonthChange={(month) => changeMonth(1, month)}
                onYearChange={(year) => changeYear(1, year)}
              />
            </div>
          </div>

          {/* TOMBOL CANCEL DAN APPLY */}

          <div
            className="
              flex
              items-center
              justify-end
              gap-2
              border-t
              border-gray-200
              mt-4
              pt-4
            "
          >
            <button
              type="button"
              onClick={handleCancel}
              className="
                px-5
                py-2
                text-[13px]
                font-semibold
                text-gray-800
                bg-gray-100
                hover:bg-gray-200
                rounded-lg
                transition
              "
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={!draftRange.startDate || !draftRange.endDate}
              onClick={handleApply}
              className="
                px-5
                py-2
                text-[13px]
                font-semibold
                text-white
                bg-[#171717]
                hover:bg-black
                disabled:bg-gray-300
                disabled:cursor-not-allowed
                rounded-lg
                transition
              "
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
