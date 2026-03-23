import { Request, Response } from 'express';
import { FullReportResponse, PerformanceRow, ReportSummary } from '../../../../../packages/contracts/src/reports';

export interface IPerformanceRow extends PerformanceRow {}
export interface IReportSummary extends ReportSummary {}
export interface IFullReportResponse extends FullReportResponse {}
