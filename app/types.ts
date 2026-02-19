export interface SaftFetch<T> {
  data?: T;
  error?: string;
}

type SafeFetchOptions = {
  tag?: string;
  noStore?: boolean;
};

export const safeFetch = async <T>(
  url: string,
  options?: SafeFetchOptions,
): Promise<SaftFetch<T>> => {
  try {
    const res = await fetch(url, {
      cache: options?.noStore ? "no-store" : "force-cache",
      next: options?.noStore
        ? undefined
        : {
            revalidate: 10,
            tags: options?.tag ? [options.tag] : undefined,
          },
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status} - ${text || res.statusText}`);
    }

    const data = (await res.json()) as T;
    return { data };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Fetch failed" };
  }
};

export interface BaseResponse<T> {
  responseCode: number;
  responseMessage: string;
  data: T;
}

export interface Division {
  id: number;
  provinceId: number;
  name: string;
  urduName: string;
  shortName: string;
}

export interface District {
  id: number;
  divisionId: number;
  name: string;
  urduName: string;
  shortName: string;
}

export interface TehsilLookup {
  id: number;
  districtId: number;
  name: string;
  urduName: string;
  shortName: string;
}

export type TehsilLookupResponse = BaseResponse<TehsilLookup[]>;

export enum SAHULAT_BAZAR_ENUM {
  SAHULAT_BAZAR = 0,
  NEW = 1,
  ON_THE_GO = 2,
}

export const sahulatBazarOptions = [
  {
    label: "Sahulat Bazar",
    value: SAHULAT_BAZAR_ENUM.SAHULAT_BAZAR.toString(),
  },
  { label: "New", value: SAHULAT_BAZAR_ENUM.NEW.toString() },
  { label: "On the Go", value: SAHULAT_BAZAR_ENUM.ON_THE_GO.toString() },
];

export enum SHIFT_ENUM {
  MORNING = "Morning",
  EVENING = "Evening",
}
