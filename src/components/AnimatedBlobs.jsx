export default function AnimatedBlobs() {
  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:opacity-10 dark:mix-blend-screen" />
      <div
        className="absolute top-[20%] right-[-5%] w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob dark:opacity-10 dark:mix-blend-screen"
        style={{ animationDelay: '2s' }}
      />
      <div
        className="absolute bottom-[-10%] left-[30%] w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob dark:opacity-[0.07] dark:mix-blend-screen"
        style={{ animationDelay: '4s' }}
      />
    </div>
  );
}
