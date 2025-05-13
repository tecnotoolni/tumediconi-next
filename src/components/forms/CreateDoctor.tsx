import { useEffect, useState } from "react"
import SelectInput from "../common/ui/SelectInput"
import SelectMultiple from "../common/ui/SelectMultiple"
import TextAreaInput from "../common/ui/TextAreaInput"
import TextInput from "../common/ui/TextInput"
import VisualSelect from "../common/ui/VisualSelect"
import Option from "@/types/Option"
import { convertToOptionsFromCountries, convertToOptionsFromMetadata, convertToOptionsFromMunicipalities, convertToOptionsFromStates } from "@/utils/convertToOptions"
import { getMetadataByType } from "@/lib/metadataServiceHandler"
import { MetadataType } from "@/types/Metadata"
import { getCountries, getMunicipaltyByStateCode, getStatesByCountryCode } from "@/lib/geolocalizationHandler"
import { genderOptions } from "@/sources/options"
import { KeyWithStringValue } from "@/types/KeyWithStringValue"
interface Props {
    onLoadingChange?: (isLoading: boolean) => void;
    fieldError?: KeyWithStringValue
}

export default function CreateDoctor({ onLoadingChange, fieldError }: Props) {
    const [options, setOptions] = useState<{ [key: string]: Option[] }>({
        countries: [],
        states: [],
        municipalities: [],
        specialties: [],
        languages: [],
        business_hours: []
    });

    const setDynamicOptions = (field: string, value: Option[]) => {
      setOptions((prevOptions) => ({
        ...prevOptions,
        [field]: value,
      }));
    }

    
    const [selectedLanguage, setSelectedLanguages] = useState<string[]>([]);
    const [selectedBusinessHours, setSelectedBusinessHours] = useState<string[]>([]);

    const [fieldsError, setFieldsError] = useState<KeyWithStringValue>({}) 
    
    const [data, setData] = useState<{[key: string] : string}>({})
    const setDynamicData = (field: string, value: string) => {
      setData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
    
    useEffect(() => {
        if (fieldError) {
            setFieldsError(fieldError);
        }
    }, [fieldError])

    useEffect(() => {
        const fetchStatesByCountry = async () => {

          if(!data.country) {
            return;
          }

          const states = await getStatesByCountryCode(data.country);
          const options = convertToOptionsFromStates(states.data);
          
          setDynamicOptions("states", options);
        }
  
        fetchStatesByCountry()
      },[data.country])
  
      useEffect(() => {
        const fetchMunicipaltiesByState = async () => {

          if(!data.state || !data.country) {
            return;
          }

          const municipalities = await getMunicipaltyByStateCode(data.state, data.country);
          const options = convertToOptionsFromMunicipalities(municipalities.data);
          
          setDynamicOptions("municipalities", options);
        }
  
        fetchMunicipaltiesByState()
      },[data.country, data.state])
  
      useEffect(() => {
  
        const fetchCountries = async () => {
          console.log("Fetching countries");
          const countries = await getCountries();
          const options = convertToOptionsFromCountries(countries.data);
          
          setDynamicData("country", options[0].value);
          setDynamicOptions("countries", options);
          
        }
  
        const fetchMetadataSpecialties = async () => {
          const metadata = await getMetadataByType(MetadataType.specialty);
          const options = convertToOptionsFromMetadata(metadata.data);
  
          setDynamicOptions("specialties", options);
        }
  
        const fetchMetadataBusinessHours= async () => {
          const metadata = await getMetadataByType(MetadataType.business_hours);
          const options = convertToOptionsFromMetadata(metadata.data);

          setDynamicOptions("business_hours", options);
        }
  
        const fetchMetadataLanguages = async () => {
          const metadata = await getMetadataByType(MetadataType.language);
  
          const options = convertToOptionsFromMetadata(metadata.data);

          setDynamicOptions("languages", options);
        }
  
        Promise.all([fetchMetadataSpecialties(), fetchMetadataLanguages(), fetchMetadataBusinessHours(), fetchCountries()])
        .then(() => {
            if (onLoadingChange) {
                onLoadingChange(false);
            }
        })
  
      },[onLoadingChange])
  

    return(
        <>
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-primary-700 mb-6">Datos Personales</h2>
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <TextInput error={fieldsError?.firstName} label="Nombres" name="firstName" />
                      <TextInput error={fieldsError?.lastName} label="Apellidos" name="lastName" />
                    </div>
                    <VisualSelect inline name="gender" options={genderOptions} />
                    <div className="grid grid-cols-2 gap-4">
                      <TextInput error={fieldsError?.activeSince} type="date" label="Activo Desde" name="activeSince" />
                      <SelectInput error={fieldsError?.specialty} label="Especialidad" options={options.specialties} name="specialtyID" />
                    </div>
                </div>
                </div>

                <div className="mb-8">
                <h2 className="text-2xl font-semibold text-primary-700 mb-6">Localización</h2>
                <div className="flex flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                    <SelectInput hidePlaceholder error={fieldsError?.countryID} onChange={(value) => { setDynamicData("country", value)}} label="Pais" options={options.countries} name="countryID" disabled />
                    <SelectInput error={fieldsError?.stateID} onChange={(value) => { setDynamicData("state", value)}} label="Departamento" options={options.states} name="stateID" disabled={options.states.length === 0} />
                    </div>
                    <SelectInput error={fieldsError?.municipaltyID} onChange={(value) => { setDynamicData("municipality", value)}} label="Municipio" options={options.municipalities} name="municipaltyID" disabled={options.municipalities.length === 0} />
                    <TextAreaInput error={fieldsError?.aproximateAddress} label="Direccion Aproximada" name="aproximateAddress" />
                </div>
                </div>

                <div className="mb-8">
                <h2 className="text-2xl font-semibold text-primary-700 mb-6">Desarrollo Profesional</h2>
                <div className="flex flex-col gap-4">
                    <SelectMultiple error={fieldsError?.languages} enableSearch name="languages" label="Idiomas" value={selectedLanguage} options={options.languages} onChange={setSelectedLanguages} placeholder="Selecciona tus idiomas" />
                    <SelectMultiple error={fieldsError?.businessHours} enableSearch name="business_hours" label="Horarios de Atención" value={selectedBusinessHours} options={options.business_hours} onChange={setSelectedBusinessHours} placeholder="Selecciona tus horarios de atención" />
                </div>
            </div>
        </>
    )
}