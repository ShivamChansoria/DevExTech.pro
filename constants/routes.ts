const ROUTES = {
  home: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  askQuestion: "/ask-question",
  collection: "/collection",
  community: "/community",
  tags: "/tags",
  jobs: "/jobs",
  question: (id: string) => `/questions/${id}`,
  profile: (id: string) => `/profile/${id}`,
  tag: (id: string) => `/tag/${id}`,
  signInWithOAuth: "/sign-in-with-oauth",
  services: "/services",
  about: "/about",
  contact: "/contact",
  myPurchase: "/my-purchase",
};

export default ROUTES;
