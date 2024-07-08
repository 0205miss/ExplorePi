import "server-only";
import { translate } from "translate-config";
import BlockStream from "./txstream";

export async function generateStaticParams() {
  return translate.locales.map((locale) => ({ lang: locale }));
}

export default async function ExplorerPage({ params: { lang } }) {
  const transcript = await import(`locales/${lang}.json`);
  return (
    <div className="w-full h-full md:pb-[58px] overflow-hidden bg-white">
      <div className="p-5 pb-16 w-full h-full overflow-scroll">
        <div className="flex w-full h-auto flex-col">
          <BlockStream time={transcript.time} lang={lang} />
        </div>
      </div>
    </div>
  );
}
