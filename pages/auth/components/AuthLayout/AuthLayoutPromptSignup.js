// Components
import { AuthLayoutPrompt } from "./AuthLayoutPrompt";
import AuthLayoutPromptConditions from "./AuthLayoutPromptConditions";

/** Auth signup prompt on login pages */
const AuthLayoutPromptSignup = () => {
  return (
    <AuthLayoutPrompt actionText="Sign in with PrimeLab" actionTo="/auth" promptText="Don't have a PrimeLab account?">
      <AuthLayoutPromptConditions />
    </AuthLayoutPrompt>
  );
};

export default AuthLayoutPromptSignup;
