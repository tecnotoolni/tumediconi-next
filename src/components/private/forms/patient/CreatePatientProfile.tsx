import { useEffect, useState } from "react";
import { genderOptions } from "@/sources/options";
import { KeyWithStringValue } from "@/types/KeyWithStringValue";
import TextInput from "@/components/common/ui/TextInput";
import VisualSelect from "@/components/common/ui/VisualSelect";
import TextAreaInput from "@/components/common/ui/TextAreaInput";
import GeolocationSelects from "../GeolocationSelects";

interface Props {
  onLoadingChange?: (isLoading: boolean) => void;
  fieldError?: KeyWithStringValue;
}

export default function CreatePatientProfile({ onLoadingChange, fieldError }: Props) {

  const [fieldsError, setFieldsError] = useState<KeyWithStringValue>({});
  const [data, setData] = useState<{ [key: string]: string }>({});

  const setDynamicData = (field: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  useEffect(() => {
    if (fieldError) {
      setFieldsError(fieldError);
    }
  }, [fieldError]);


  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-primary-700 mb-6">Datos Personales</h2>
        <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
                <TextInput required error={fieldsError?.firstName} label="Nombres" name="firstName" />
                <TextInput required error={fieldsError?.lastName} label="Apellidos" name="lastName" />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <TextInput required error={fieldsError?.identityCard} label="Cédula de Identidad" name="identityCard" />
                <TextInput error={fieldsError?.birthDate} type="date" label="Fecha de Nacimiento" name="birthDate" />
            </div>
            <TextInput required error={fieldsError?.phone} label="Teléfono" name="phone" />
            <VisualSelect inline name="gender" options={genderOptions} />
        </div>
      </div>

      <div className="mb-8">
        <div className=" mb-6">
            <h2 className="text-2xl font-semibold text-primary-700">Localización</h2>
            <p className="text-sm font-roboto text-cool-gray-600">Estos parámetros para aproximar tu localización nos ayudará en un futuro ubicar tus mejores opciones en tu sector.</p>
        </div>
        <div className="flex flex-col gap-4">
          <GeolocationSelects
            data={data}
            fieldError={fieldsError}
            setDynamicData={setDynamicData}
            onLoadingChange={onLoadingChange}
          />
          <TextAreaInput error={fieldsError?.aproximateAddress} label="Dirección Aproximada" name="address" />
        </div>
      </div>
    </>
  );
}
