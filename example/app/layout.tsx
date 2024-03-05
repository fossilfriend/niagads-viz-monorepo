import React from "react";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <div style={{ padding: "50px" }}>
                    {children}
                </div>
            </body>
        </html>
    );
}
