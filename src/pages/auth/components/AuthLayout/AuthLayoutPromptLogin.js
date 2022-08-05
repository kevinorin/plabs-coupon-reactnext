// Components
import { AuthLayoutPrompt } from "@pages/auth/components";
import AuthLayoutPromptConditions from "./AuthLayoutPromptConditions";

/** Auth login prompt on signup pages */
const AuthLayoutPromptLogin = () => {
  return (
    <AuthLayoutPrompt
      actionText="Log in with PrimeLab"
      actionTo="/auth?focusSignIn=true"
      promptText="Already have a PrimeLab account?"
    >
      <AuthLayoutPromptConditions />
    </AuthLayoutPrompt>
  );
};

export default AuthLayoutPromptLogin;
