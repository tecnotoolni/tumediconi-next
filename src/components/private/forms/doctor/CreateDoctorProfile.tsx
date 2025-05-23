import { useEffect, useState } from "react";
import Option from "@/types/Option";
import { convertToOptionsFromMetadata } from "@/utils/convertToOptions";
import { getMetadataByType } from "@/lib/private/metadataServiceHandler";
import { MetadataType } from "@/types/Metadata";
import { genderOptions } from "@/sources/options";
import { KeyWithStringValue } from "@/types/KeyWithStringValue";
import SelectInput from "@/components/common/ui/SelectInput";
import TextInput from "@/components/common/ui/TextInput";
import VisualSelect from "@/components/common/ui/VisualSelect";
import SelectMultiple from "@/components/common/ui/SelectMultiple";
import TextAreaInput from "@/components/common/ui/TextAreaInput";
import GeolocationSelects from "../GeolocationSelects";

interface Props {
  onLoadingChange?: (isLoading: boolean) => void;
  fieldError?: KeyWithStringValue;
}

export default function CreateDoctor({ onLoadingChange, fieldError }: Props) {
  const [options, setOptions] = useState<{ [key: string]: Option[] }>({
    specialties: [],
    languages: [],
    business_hours: [],
  });

  const [selectedLanguage, setSelectedLanguages] = useState<string[]>([]);
  const [selectedBusinessHours, setSelectedBusinessHours] = useState<string[]>([]);

  const [fieldsError, setFieldsError] = useState<KeyWithStringValue>({});
  const [data, setData] = useState<{ [key: string]: string }>({});

  const setDynamicData = (field: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const setDynamicOptions = (field: string, value: Option[]) => {
    setOptions((prevOptions) => ({
      ...prevOptions,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (fieldError) {
      setFieldsError(fieldError);
    }
  }, [fieldError]);

  useEffect(() => {
    const fetchData = async () => {
      const [specialty, language, businessHours] = await Promise.all([
        getMetadataByType(MetadataType.specialty),
        getMetadataByType(MetadataType.language),
        getMetadataByType(MetadataType.business_hours),
      ]);

      setDynamicOptions("specialties", convertToOptionsFromMetadata(specialty.data));
      setDynamicOptions("languages", convertToOptionsFromMetadata(language.data));
      setDynamicOptions("business_hours", convertToOptionsFromMetadata(businessHours.data));

      if (onLoadingChange) onLoadingChange(false);
    };

    fetchData();
  }, [onLoadingChange]);

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-primary-700 mb-6">Datos Personales</h2>
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <TextInput required error={fieldsError?.firstName} label="Nombres" name="firstName" />
            <TextInput required error={fieldsError?.lastName} label="Apellidos" name="lastName" />
          </div>
          <VisualSelect inline name="gender" options={genderOptions} />
          <div className="grid grid-cols-2 gap-4">
            <TextInput error={fieldsError?.activeSince} type="date" label="Activo Desde" name="activeSince" />
            <SelectInput
              error={fieldsError?.specialty}
              label="Especialidad"
              options={options.specialties}
              name="specialtyID"
            />
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-primary-700 mb-6">Localización</h2>
        <div className="flex flex-col gap-4">
          <GeolocationSelects
            data={data}
            fieldError={fieldsError}
            setDynamicData={setDynamicData}
          />
          <TextAreaInput error={fieldsError?.aproximateAddress} label="Dirección Aproximada" name="aproximateAddress" />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-primary-700 mb-6">Desarrollo Profesional</h2>
        <div className="flex flex-col gap-4">
          <SelectMultiple
            required
            error={fieldsError?.languages}
            enableSearch
            name="languages"
            label="Idiomas"
            value={selectedLanguage}
            options={options.languages}
            onChange={setSelectedLanguages}
            placeholder="Selecciona tus idiomas"
          />
          <SelectMultiple
            required
            error={fieldsError?.businessHours}
            enableSearch
            name="business_hours"
            label="Horarios de Atención"
            value={selectedBusinessHours}
            options={options.business_hours}
            onChange={setSelectedBusinessHours}
            placeholder="Selecciona tus horarios de atención"
          />
        </div>
      </div>
    </>
  );
}
