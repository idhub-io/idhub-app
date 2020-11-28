import { AppEffects } from './app.effects';
import { ProvidersEffects } from './providers.effects';
import { PassportsEffects } from './passports.effects';
import { SharedPassportsEffects } from './shared-passports.effects';

export const rootEffects = [
  AppEffects,
  ProvidersEffects,
  PassportsEffects,
  SharedPassportsEffects,
];
