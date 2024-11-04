import Card from "./card";
import * as React from "react";
import * as analytics from "@/utils/analytics";
import { useSearchParams } from "react-router-dom";
import { Transition } from "@headlessui/react";
import { cn } from "@/utils/cn";
import Carousel, { CarouselContext } from "@/components/carousel";
import { Icon } from "@iconify-icon/react";
import { localStorageKeys } from "@/constants/local-storage";
import Agent from "./agent";
import { TeamMember } from "@/types/team-member";

import useMachine from "@/machine/ciao-bella/use-machine";
import CHARACTERS from "@/data/ciao-bella/characters";

const CarouselSlide = ({
  children,
  className,
  index,
}: {
  children: React.ReactNode;
  className?: string;
  index: number;
}) => {
  const emblaApi = React.useContext(CarouselContext);

  return (
    <div
      className="cursor-pointer"
      onClick={() => {
        emblaApi?.scrollTo?.(index);
        localStorage.setItem(localStorageKeys.carouselIndex, index.toString());
      }}
      role="button"
      aria-label="Carousel slide"
      tabIndex={0}
    >
      <div
        className={cn(
          "transform transition",
          emblaApi?.selectedIndex === index
            ? "[&>*]:grayscale-0"
            : "!scale-75 [&>*]:grayscale opacity-50",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

type CharacterName = (typeof CHARACTERS)[number]["id"];

function Home() {
  const { snapshot, send } = useMachine();
  const [searchParams, setSearchParams] = useSearchParams();
  const characterDisplayed = searchParams.get(
    "character"
  ) as CharacterName | null;

  const trackCardAction = (character: TeamMember) => () => {
    analytics.track({
      event: "click_request",
      action_name: character.trackingId,
      box_number: `1`,
    });

    send({
      type: `CHARACTER_REQUEST_OPEN`,
      character: character.id as CharacterName,
    });

    if (
      !character.guard
      // || character.guard?.(progress)
    ) {
      setSearchParams(`?character=${character.id}`);
    }
  };

  if (characterDisplayed) {
    const data = snapshot.context.teamMembers.find(
      (character) => character.id === characterDisplayed
    )!;

    const inputName = `request-${data.id}`;

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      const formData = new FormData(e.currentTarget);
      const value = formData.get(inputName) as string;

      send({
        type: "CHARACTER_REQUEST_SUBMIT",
        payload: value,
        character: data.id as CharacterName,
      });

      return;
    };

    const randomNumber = Math.floor(Math.random() * data.catchphrases.length);

    return (
      <main className="flex h-full p-4 sm:p-8">
        <Agent
          action={data.question}
          catchphrase={data.catchphrases[randomNumber]}
          header={{
            icon: data.icon,
            title: data.actionTitle,
          }}
          id={data.id}
          input={{ ...data.input, name: inputName }}
          portrait={data.img}
          onClose={() => setSearchParams("")}
          onSubmit={handleSubmit}
        />
      </main>
    );
  }

  return (
    <main className="flex h-full p-4 sm:p-8">
      {/* Desktop */}
      <div className="flex w-full gap-4 max-sm:hidden">
        {snapshot.context.teamMembers?.map((character, index) => (
          <Transition
            key={character.id}
            appear
            as={React.Fragment}
            show={!characterDisplayed}
            /**
             * Using the index to delay the entrance of each card
             * We voluntarily make it not dynamic to allow tailwind to scan the classes
             *
             * ex: `delay-[${index*50}ms]` would not work since tailwind would not be able to scan it
             *
             * We could use a css variable but it would require additional element wraping
             */
            enter={cn(
              index === 0 && "delay-[50ms]",
              index === 1 && "delay-[100ms]",
              index === 2 && "delay-[150ms]",
              index === 3 && "delay-[200ms]",
              index === 4 && "delay-[250ms]"
            )}
            enterFrom="opacity-0 translate-y-4"
            enterTo="opacity-100 translate-y-0"
            leave="transition-opacity"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Card
              key={character.id}
              className="hover:w-[150%] hover:grayscale-0"
              img={character.img}
              name={character.name}
              role={character.role}
              contentButton={
                <span className="flex items-center gap-2 text-white">
                  <Icon
                    icon={character.icon}
                    height="unset"
                    className="size-4 shrink-0"
                  />
                  {character.actionName || ""}
                </span>
              }
              actionButton={trackCardAction(character)}
              state={character.state || ""}
            />
          </Transition>
        ))}
      </div>

      {/* Mobile */}
      <div className="w-full sm:hidden">
        <Carousel
          containerClassName="h-full"
          options={{
            loop: true,
            startIndex:
              Number(localStorage.getItem(localStorageKeys.carouselIndex)) || 0,
          }}
        >
          {snapshot.context.teamMembers.map((character, index) => (
            <CarouselSlide
              key={character.id}
              index={index}
              className="h-[50vh] w-full min-w-[60vw]"
            >
              <Card
                key={character.id}
                img={character.img}
                name={character.name}
                role={character.role}
                contentButton={
                  <span className="flex items-center gap-2 text-white">
                    <Icon
                      height="unset"
                      icon={character.icon}
                      className="size-4 shrink-0"
                    />
                    {character.actionName || ""}
                  </span>
                }
                actionButton={trackCardAction(character)}
                state={character.state || ""}
              />
            </CarouselSlide>
          ))}
        </Carousel>
      </div>
    </main>
  );
}

/**
 * @external react-router-dom
 * @see https://reactrouter.com/en/main/route/route#elementcomponent
 */
export const Component = () => <Home />;

// export default Home;
