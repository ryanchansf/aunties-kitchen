import Image from "next/image";
    import { ChakraProvider } from "@chakra-ui/react";

export default function Home() {
  return (
    <ChakraProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        hi
      </main>
    </ChakraProvider>
  );
}
