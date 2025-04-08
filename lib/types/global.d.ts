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
