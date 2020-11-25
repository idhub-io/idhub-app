export interface IProvider {
  id: string;
  trustworthyLevel: string;
  claims?: Claim[];
}

interface Claim {
  id: string;
  trustworthy: boolean;
}
