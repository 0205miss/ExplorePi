import { SparklesCore } from "components/ui/background-boxed";

export default function Banner() {
  return (
    <div className="h-[8rem] relative w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      <div className="w-full absolute inset-0 h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <h1 className="text-2xl font-bold text-center text-white relative z-20">
        New and Friendly Explorer for Pi Network
      </h1>
    </div>
  );
}
