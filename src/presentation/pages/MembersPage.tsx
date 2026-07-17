import { Badge, Flex, VStack } from "@chakra-ui/react";
import { useAuth } from "../../infrastructure/session/Authcontext";
import { useSettings } from "../providers/SettingsProvider";

export default function MembersPage() {
  const { user } = useAuth();
  const { settings, isLoading, error, updateSettings } = useSettings();
  console.log(settings)

  return (
    <VStack>
      La salle est actuellement:
      <Badge
        bg={settings?.data.open ? "green" : "red"}
        color={settings?.data.open ? "white" : "black"}

        onClick={(e) => updateSettings({
          id: settings?.id,
          data: {"open": !settings?.data.open, "holder": {user}},
        })}
      >
        {settings?.data.open ? " Ouverte " : " Fermée "}
      </Badge>
      Dernière mise à jour par [{settings?.data?.holder?.user.name}]
    </VStack>
  );
}
