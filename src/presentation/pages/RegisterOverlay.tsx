import { useState } from "react";
import { useAuth } from "../../infrastructure/session/Authcontext";
import { Button, CloseButton, Dialog, Field, Input, Portal, Text, Stack } from "@chakra-ui/react";
import { PasswordInput } from "../../components/ui/password-input";

type RegisterOverlayProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function RegisterOverlay({ open, onOpenChange }: RegisterOverlayProps) {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function resetFields() {
    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setError(null);
  }

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setError(null);

    if (password !== passwordConfirm) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    setIsSubmitting(true);
    try {
      await register(email, password, name);
      onOpenChange(false);
      resetFields();
    } catch (err) {
      setError("Impossible de créer le compte (email déjà utilisé ?)");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={(e) => onOpenChange(e.open)} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="380px">
            <Dialog.Header borderBottomWidth="1px">
              <Dialog.Title>Créer un compte</Dialog.Title>
              <Dialog.CloseTrigger asChild position="absolute" top={3} right={3}>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>

            <form onSubmit={handleSubmit}>
              <Dialog.Body>
                <Stack gap={4}>
                  <Field.Root required>
                    <Field.Label>Nom</Field.Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Votre nom"
                      autoFocus
                    />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>Email</Field.Label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="vous@exemple.fr"
                    />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>Mot de passe</Field.Label>
                    <PasswordInput
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                    />
                  </Field.Root>

                  <Field.Root required>
                    <Field.Label>Confirmer le mot de passe</Field.Label>
                    <PasswordInput
                      type="password"
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                      placeholder="••••••••"
                    />
                  </Field.Root>

                  {error && (
                    <Text fontSize="sm" color="red.500">
                      {error}
                    </Text>
                  )}
                </Stack>
              </Dialog.Body>

              <Dialog.Footer borderTopWidth="1px">
                <Button
                  type="submit"
                  w="full"
                  loading={isSubmitting}
                >
                  Créer mon compte
                </Button>
              </Dialog.Footer>
            </form>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}
