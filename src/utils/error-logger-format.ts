export const errorLoggerFormat = ({
    name,
    message,
    stack = undefined,
}: Error): string => (
    JSON.stringify({
        name,
        message,
        stack,
    })
);