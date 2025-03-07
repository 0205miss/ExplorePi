"use client";
import { faCrown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { Accordion, AccordionItem } from "@nextui-org/react";

export default function Top10({ data, lang, transcript }) {
  if (!data || !lang) return;
  return (
    <>
      <div className="text-center mb-2 font-bold text-lg bg-border bg-border-size bg-no-repeat bg-left-bottom">
        {transcript.title}
      </div>
      <Accordion variant="splitted">
        <AccordionItem
          key="1"
          aria-label={transcript.AccountBalance}
          title={transcript.AccountBalance}
        >
          <div className="block w-full">
            <div className="overflow-hidden">
              <table className="w-full text-center table-auto">
                <thead className="border-b bg-gray-50 w-full">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 py-4"
                    >
                      No.
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 py-4"
                    >
                      {transcript.account}
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 py-4"
                    >
                      {transcript.amount}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data != null &&
                    data.top10.map((data, index) => {
                      let account =
                        typeof data.account === "string"
                          ? data.account.substring(0, 4)
                          : "";

                      return (
                        <tr key={index} className="bg-white border-b">
                          {index === 0 ? (
                            <td className="px-2 py-4 text-sm font-medium text-yellow-300">
                              <FontAwesomeIcon icon={faCrown} />
                            </td>
                          ) : (
                            <td className="px-2 py-4 text-sm font-medium text-yellow-500">
                              {index + 1}
                            </td>
                          )}

                          <td className="px-2 py-4 text-sm font-medium text-gray-900">
                            <Link prefetch={false} href={`/${lang}/account/${data.account}`}>
                              <span className=" inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-purple-400 text-white rounded-full">
                                {account}
                              </span>
                            </Link>
                          </td>

                          <td className="text-sm text-gray-900 font-light px-2 py-4 break-words">
                            {parseFloat(data.balance)} Pi
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label={transcript.AccountFee}
          title={transcript.AccountFee}
        >
          <div className="block w-full">
            <div className="overflow-hidden">
              <table className="w-full text-center table-auto">
                <thead className="border-b bg-gray-50 w-full">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 py-4"
                    >
                      No.
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 py-4"
                    >
                      {transcript.account}
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 py-4"
                    >
                      {transcript.PayForFee}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data != null &&
                    data.top10fee.map((data, index) => {
                      let account =
                        typeof data.account === "string"
                          ? data.account.substring(0, 4)
                          : "";

                      return (
                        <tr key={index} className="bg-white border-b">
                          {index === 0 ? (
                            <td className="px-2 py-4 text-sm font-medium text-yellow-300">
                              <FontAwesomeIcon icon={faCrown} />
                            </td>
                          ) : (
                            <td className="px-2 py-4 text-sm font-medium text-yellow-500">
                              {index + 1}
                            </td>
                          )}

                          <td className="px-2 py-4 text-sm font-medium text-gray-900">
                            <Link prefetch={false} href={`/${lang}/account/${data.account}`}>
                              <span className=" inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-purple-400 text-white rounded-full">
                                {account}
                              </span>
                            </Link>
                          </td>

                          <td className="text-sm text-gray-900 font-light px-2 py-4 break-words">
                            {parseFloat(data.total)} Pi
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label={transcript.AccountPayment}
          title={transcript.AccountPayment}
        >
          <div className="block w-full">
            <div className="overflow-hidden">
              <table className="w-full text-center table-auto">
                <thead className="border-b bg-gray-50 w-full">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 py-4"
                    >
                      No.
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 py-4"
                    >
                      {transcript.account}
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-gray-900 py-4"
                    >
                      {transcript.Frequency}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data != null &&
                    data.top10payment.map((data, index) => {
                      let account =
                        typeof data.account === "string"
                          ? data.account.substring(0, 4)
                          : "";

                      return (
                        <tr key={index} className="bg-white border-b">
                          {index === 0 ? (
                            <td className="px-2 py-4 text-sm font-medium text-yellow-300">
                              <FontAwesomeIcon icon={faCrown} />
                            </td>
                          ) : (
                            <td className="px-2 py-4 text-sm font-medium text-yellow-500">
                              {index + 1}
                            </td>
                          )}

                          <td className="px-2 py-4 text-sm font-medium text-gray-900">
                            <Link prefetch={false} href={`/${lang}/account/${data.account}`}>
                              <span className=" inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-purple-400 text-white rounded-full">
                                {account}
                              </span>
                            </Link>
                          </td>

                          <td className="text-sm text-gray-900 font-light px-2 py-4 break-words">
                            {parseInt(data.count)}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </AccordionItem>
      </Accordion>
    </>
  );
}
