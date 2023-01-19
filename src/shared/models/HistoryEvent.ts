import { Command } from '../commands/Command';
import { HistoryEventStatus } from './HistoryEventStatus.enum';

export interface HistoryEvent {
    command: Command;
    status: HistoryEventStatus
}