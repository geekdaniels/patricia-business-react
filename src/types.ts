export interface PatriciaCheckoutProps {
  initialize: (config: Config) => void;
}

export interface Message {
  status: boolean;
  message: string;
}

export interface ErrorProp {
  data: Message;
  error: boolean;
}

export interface CloseProp {
  close: boolean;
  data: Message;
  error: boolean;
}

export interface SuccessProp {
  data: {
    reference: string;
    status: boolean;
    message: string;
  };
  success: boolean;
}

export interface Config {
  public_key: string;
  first_name: string;
  last_name: string;
  email: string;
  amount: string;
  currency: string;
  payment_method: string;
  metadata: Metadata;
  onSuccess: (data?: SuccessProp) => void;
  onError: (data?: ErrorProp) => void;
  onClose?: (data?: CloseProp) => void;
}

export interface Metadata {
  payment_device: string;
}
