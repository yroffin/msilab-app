import { useState } from "react";
import { useAuth } from "../../infrastructure/session/Authcontext";
import { Button, CloseButton, Dialog, Field, Input, Portal, Text, Stack } from "@chakra-ui/react";
import { PasswordInput } from "../../components/ui/password-input";

type LoginOverlayProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
};

export function LoginOverlay({ open, onOpenChange }: LoginOverlayProps) {
    const { login, requestPasswordReset } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [info, setInfo] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isResetSubmitting, setIsResetSubmitting] = useState(false);

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        setError(null);
        setInfo(null);
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

    async function handleForgotPassword() {
        setError(null);
        setInfo(null);

        if (!email.trim()) {
            setError("Saisissez votre email pour recevoir le lien de réinitialisation.");
            return;
        }

        setIsResetSubmitting(true);
        try {
            await requestPasswordReset(email.trim());
            setInfo("Si un compte existe pour cet email, un lien de réinitialisation a été envoyé.");
        } catch {
            setError("Impossible d'envoyer le lien pour le moment. Réessayez plus tard.");
        } finally {
            setIsResetSubmitting(false);
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

                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        alignSelf="start"
                                        px={0}
                                        onClick={handleForgotPassword}
                                        loading={isResetSubmitting}
                                        disabled={isSubmitting}
                                    >
                                        Mot de passe oublié ?
                                    </Button>

                                    {info && (
                                        <Text fontSize="sm" color="green.600">
                                            {info}
                                        </Text>
                                    )}

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
