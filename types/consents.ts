export type Consents = {
  id: number;
  device_id: string;
  consent_options: ConsentOption[];
};

type ConsentOption = {
  id: number;
  name: string;
  description: string;
  enable: boolean;
};
