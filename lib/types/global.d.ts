export default interface ProductSchemaParams {
  title: string;
  description: string;
  price: number;
  discountedPrice: number;
  productDescription: string;
  inclusions: string[];
  access: string[];
}

export interface SignInWithOAuthParams {
  user: {
    name?: string;
    email: string;
    image?: string;
  };
  provider: string;
  providerAccountId: string;
}

export interface SignInWithCredentialsParams {
  email: string;
  password: string;
}

export interface SignUpWithCredentialsParams {
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
  contact: number;
  password: string;
}

// Define the ActionResponse type
export interface ActionResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Define AuthCredentials interface
export interface AuthCredentials {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  organization?: string;
  address?: string;
  terms: boolean;
}
