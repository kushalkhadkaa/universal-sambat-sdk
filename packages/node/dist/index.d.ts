export interface BsDate { year: number; month: number; day: number; iso: string; weekday?: number; }
export interface AdDate { year: number; month: number; day: number; iso: string; date: Date; }

export function bsToAd(year: number, month: number, day: number): AdDate;
export function adToBs(date: Date | string): BsDate;
export function BS2AD(dateStr: string): string;
export function AD2BS(dateStr: string): string;
export function isValidBs(year: number, month: number, day: number): boolean;
export function todayBs(): BsDate;
export function daysDiff(a: BsDate, b: BsDate): number;
export function formatBs(year: number, month: number, day: number, format?: string, lang?: string): string;

import { RequestHandler } from 'express';
export function nepaliDateParser(fields: string[]): RequestHandler;
export function validateBsField(field: string): RequestHandler;
export function autoConvertBsFields(): RequestHandler;
