import { Box } from "@chakra-ui/react";
import { useAuth } from "../../infrastructure/session/Authcontext";

export default function MembersPage() {
  const { user } = useAuth();
  
  return (
    <Box>
      {user?.id}
    </Box>
  );
}
