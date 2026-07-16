import { useState } from "react";
import { useAuth } from "../../infrastructure/session/Authcontext";
import { Button, CloseButton, Dialog, Field, Input, Portal, Text, Stack } from "@chakra-ui/react";
import { PasswordInput } from "../../components/ui/password-input";

type LoginOverlayProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export function LoginOverlay({ open, onOpenChange }: LoginOverlayProps) {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            await login(email, password);
            onOpenChange(false);
            setEmail("");
            setPassword("");
        } catch (err) {
            setError("Email ou mot de passe incorrect");
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
                            <Dialog.Title>Connexion</Dialog.Title>
                            <Dialog.CloseTrigger asChild position="absolute" top={3} right={3}>
                                <CloseButton size="sm" />
                            </Dialog.CloseTrigger>
                        </Dialog.Header>

                        <form onSubmit={handleSubmit}>
                            <Dialog.Body>
                                <Stack gap={4}>
                                    <Field.Root required>
                                        <Field.Label>Email</Field.Label>
                                        <Input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="vous@exemple.fr"
                                            autoFocus
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
                                    Se connecter
                                </Button>
                            </Dialog.Footer>
                        </form>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}
