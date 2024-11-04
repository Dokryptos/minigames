import * as React from "react";
import { Icon } from "@iconify-icon/react";
import AudioAutoplay from "@/components/audio-autoplay";
import Image from "@/components/image";
import Button from "@/components/button";
import Input from "@/components/input";

const Path = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 132 45">
    <path
      stroke="url(#a)"
      strokeLinecap="round"
      strokeWidth="2"
      d="M1 43.6548h61.5c1.1046 0 2-.8954 2-2V3.15479c0-1.10457.8954-2 2-2h64"
    />
    <defs>
      <linearGradient
        id="a"
        x1="135.5"
        x2="1"
        y1="1.15479"
        y2="1.15479"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FAFAFA" />
        <stop offset="1" stopColor="#FAFAFA" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

interface AgentProps {
  action?: string;
  catchphrase: string;
  header: {
    icon: string;
    title: string;
  };
  id: string;
  input: {
    label: string;
    name: string;
    placeholder: string;
    type?: string;
  };
  portrait: { src: string; height: number; width: number; lqip: string };
  onClose: () => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void> | void;
}

const Agent = (props: AgentProps) => {
  const { action, catchphrase, header, input, portrait, onClose, onSubmit } =
    props;
  const { icon, title } = header;

  const formRef = React.useRef<HTMLFormElement>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await onSubmit(event);

    formRef.current?.reset();
  };

  return (
    <div className="relative flex w-full overflow-hidden rounded-md border border-solid border-zinc-600">
      <div className="absolute -z-10 size-0 overflow-hidden">
        <AudioAutoplay ignoreContext src={catchphrase} />
      </div>

      <div className="relative max-w-sm basis-1/3 max-sm:hidden sm:min-w-48">
        <Image
          className="size-full object-cover"
          {...portrait}
          alt="agent portrait"
        />

        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black via-black/75 to-transparent px-4 pb-4 pt-8">
          <div className="font-din flex items-center gap-4">
            <Icon
              icon={icon}
              height="unset"
              className="size-6 text-white opacity-50"
            />
            <span>{title}</span>
          </div>
        </div>
      </div>

      <div className="relative flex w-0 grow basis-full flex-col">
        <div className="absolute right-0 top-0 p-4">
          <button
            className="flex size-8 items-center justify-center rounded-sm bg-zinc-600 transition-colors hover:bg-zinc-500"
            type="button"
            onClick={onClose}
          >
            <Icon icon="lucide:x" className="size-4" />
          </button>
        </div>

        <div className="flex w-full flex-1 flex-col items-start gap-6 p-4 sm:p-8">
          <div className="font-din flex items-center gap-4 pr-12 sm:hidden">
            <Icon
              icon={icon}
              height="unset"
              className="size-6 text-white opacity-50"
            />
            <span className="text-left max-sm:leading-5">{title}</span>
          </div>

          <div className="relative mr-8 bg-[#E7424B] px-6 py-4 text-white max-sm:hidden [@media(max-height:700px)]:hidden">
            <div className="absolute right-[calc(100%-1rem)] top-1/2 h-16 w-40">
              <Path />
            </div>
            {action}
          </div>

          <div className="flex w-full flex-1 flex-col items-start gap-6 overflow-auto p-px max-sm:min-h-[33vh]">
            <form
              ref={formRef}
              className="flex h-full flex-col items-start gap-6 text-left"
              onSubmit={handleSubmit}
            >
              <label className="w-[500px] max-w-full space-y-4 leading-5">
                <span>{input.label}</span>

                <Input
                  min="3"
                  type={input.type || "text"}
                  name={input.name}
                  placeholder={input.placeholder}
                />
              </label>

              {/* {errorMessage && (
                <div className="text-left text-red-500">{errorMessage}</div>
              )} */}

              <Button type="submit" className="mt-auto">
                Valider
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Agent;
