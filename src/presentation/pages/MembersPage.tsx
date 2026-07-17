import { Badge, Text, VStack } from "@chakra-ui/react";
import { useAuth } from "../../infrastructure/session/Authcontext";
import { useSettings } from "../providers/SettingsProvider";

export default function MembersPage() {
  const { user } = useAuth();
  const { settings, isLoading, error, updateSettings } = useSettings();
  console.log(settings)

  return (
    <VStack>
      <Text>La salle est actuellement</Text>
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
      <Text>Dernière mise à jour par</Text>
      <Text>[{settings?.data?.holder?.user.name}]</Text>
    </VStack>
  );
}
