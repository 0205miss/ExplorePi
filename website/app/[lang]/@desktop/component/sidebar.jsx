"use client";
import Image from "next/image";
import icon from "public/icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCubes,
  faHandshake,
  faPencil,
  faNetworkWired,
  faServer,
  faUsers,
  faCircleQuestion,
  faShieldHalved,
  faInbox,
  faFlask,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { Divider,Listbox, ListboxItem } from "@nextui-org/react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
export default function SideBar({ lang }) {
  return (
    <>
      <div className="md:h-full md:block md:fixed md:bg-white hidden">
        <div className="w-64 h-full border-r-1">
          <section className="px-5 py-4">
            <Link href={"/" + lang + "/explorer"}>
              <div className="flex items-center h-14 px-4">
                <Image
                  src={icon}
                  width={50}
                  height={50}
                  alt="Picture of the ICON"
                />
                <h1 className="font-semibold ml-4">EXPLOREPI</h1>
              </div>
            </Link>
          </section>
          <Divider />
          <section className="px-3 py-4">
            <p className="font-semibold uppercase">
              Explorer
            </p>
            <Listbox aria-label="Explorer" classNames={{list:'gap-1'}}>
              <ListboxItem key="block" aria-label="block" href={"/" + lang + "/block"}>
              <FontAwesomeIcon icon={faCubes} /> <span className="ml-2">Block</span>
              </ListboxItem>
              <ListboxItem key="tx" aria-label="tx" href={"/" + lang + "/tx"}>
              <FontAwesomeIcon icon={faHandshake} /><span className="ml-2">Transaction</span>
              </ListboxItem>
              <ListboxItem key="op" aria-label="op" href={"/" + lang + "/op"}>
              <FontAwesomeIcon icon={faPencil} /><span className="ml-2">Operation</span>
              </ListboxItem>
            </Listbox>
          </section>
          <Divider/>
          <section className="px-3 py-4">
            <p className="font-semibold uppercase">
            Dashboard<span className=" font-mono mt-0 font-normal normal-case tracking-tighter text-xs">
                (MainNet)
              </span>
            </p>
            <Listbox aria-label="Dashboard" variant={'flat'} classNames={{list:'gap-1'}}>
              <ListboxItem key="network" aria-label="network" href={"/" + lang + "/network"}>
              <FontAwesomeIcon icon={faNetworkWired} />
                <span className="ml-2">Network</span>
              </ListboxItem>
              <ListboxItem key="statistic" aria-label="statistic" href={"/" + lang + "/statistic"}>
              <FontAwesomeIcon icon={faServer} />
                <span className="ml-2">Migration</span>
              </ListboxItem>
              <ListboxItem key="activity" aria-label="activity" href={"/" + lang + "/activity"}>
              <FontAwesomeIcon icon={faUsers} />
                <span className="ml-2">Activity</span>
              </ListboxItem>
            </Listbox>
          </section>
          <Divider/>
          <section className="px-3 py-4">
            <p className="font-semibold uppercase">
            Laboratory
            </p>
            <Listbox aria-label="Laboratory" variant={'flat'} classNames={{list:'gap-1'}}>
              <ListboxItem key="dev" aria-label="dev" href={"https://pi-laboratory.vercel.app/#?network=TestNet"}>
              <FontAwesomeIcon icon={faFlask} />
                <span className="ml-2">Pi BlockChain Lab</span>
              </ListboxItem>
            </Listbox>
          </section>
          <Divider/>
          <section className="px-3 py-4">
            <p className="font-semibold uppercase">
            About
            </p>
            <Listbox aria-label="Dashboard" variant={'flat'} classNames={{list:'gap-1'}}>
              <ListboxItem key="dev" aria-label="dev" href={"https://kaikai-beryl.vercel.app/"}>
              <FontAwesomeIcon icon={faInbox} />
                <span className="ml-2">Developer</span>
              </ListboxItem>
              <ListboxItem key="github" aria-label="github" href={"https://github.com/0205miss/explorepi"}>
              <FontAwesomeIcon icon={faGithub} />
                <span className="ml-2">Github</span>
              </ListboxItem>
              <ListboxItem key="policy" aria-label="policy" href={"/policy.html"}>
              <FontAwesomeIcon icon={faShieldHalved} />
                <span className="ml-2">Privacy</span>
              </ListboxItem>
            </Listbox>
          </section>
          <Divider/>
        </div>
      </div>
    </>
  );
}
