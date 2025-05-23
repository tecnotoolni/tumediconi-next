/* eslint-disable react-hooks/exhaustive-deps */
// components/common/form/GeolocationSelects.tsx

import { useEffect, useState } from "react"
import SelectInput from "@/components/common/ui/SelectInput"
import Option from "@/types/Option"
import { KeyWithStringValue } from "@/types/KeyWithStringValue"
import { getCountries, getMunicipaltyByStateCode, getStatesByCountryCode } from "@/lib/private/geolocalizationHandler"
import { convertToOptionsFromCountries, convertToOptionsFromMunicipalities, convertToOptionsFromStates } from "@/utils/convertToOptions"

interface Props {
  data: { [key: string]: string };
  setDynamicData: (field: string, value: string) => void;
  fieldError?: KeyWithStringValue;
  onLoadingChange?: (isLoading: boolean) => void;
}

export default function GeolocationSelects({ data, setDynamicData, fieldError, onLoadingChange }: Props) {
  const [options, setOptions] = useState<{ countries: Option[]; states: Option[]; municipalities: Option[] }>({
    countries: [],
    states: [],
    municipalities: [],
  });

  const setDynamicOptions = (field: string, value: Option[]) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [field]: value,
    }));
  };

  useEffect(() => {
    const fetchCountries = async () => {
      const countries = await getCountries();
      const options = convertToOptionsFromCountries(countries.data);
      setDynamicOptions("countries", options);
      setDynamicData("country", options[0]?.value);
    };

    fetchCountries().then(() => {
      if (onLoadingChange) onLoadingChange(false);
    });
  }, []);

  useEffect(() => {
    const fetchStates = async () => {
        console.log(options.countries)

      if (!data.country) {
        data.country = options.countries[0]?.value;
      };
      const states = await getStatesByCountryCode(data.country);
      setDynamicOptions("states", convertToOptionsFromStates(states.data));
    };

    fetchStates();
  }, [data.country]);

  useEffect(() => {
    const fetchMunicipalities = async () => {
      if (!data.state) return;
      const municipalities = await getMunicipaltyByStateCode(data.state, data.country);
      setDynamicOptions("municipalities", convertToOptionsFromMunicipalities(municipalities.data));
    };

    fetchMunicipalities();
  }, [data.country, data.state]);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <SelectInput
          required
          hidePlaceholder
          error={fieldError?.countryID}
          onChange={(value) => setDynamicData("country", value)}
          label="País"
          options={options.countries}
          name="countryID"
          disabled
        />
        <SelectInput
          required
          error={fieldError?.stateID}
          onChange={(value) => setDynamicData("state", value)}
          label="Departamento"
          options={options.states}
          name="stateID"
          disabled={options.states.length === 0}
        />
      </div>
      <SelectInput
        required
        error={fieldError?.municipaltyID}
        onChange={(value) => setDynamicData("municipality", value)}
        label="Municipio"
        options={options.municipalities}
        name="municipaltyID"
        disabled={options.municipalities.length === 0}
      />
    </div>
  );
}
