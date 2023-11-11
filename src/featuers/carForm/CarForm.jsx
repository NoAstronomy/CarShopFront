import { Controller } from 'react-hook-form'
import { Form, Input } from 'antd'

const ControllerInput = ({ name, control, type, errors }) => {
    const fieldRender = ({ field }) => {
        const { value } = field
        const placeholderMessage = `enter car ${name}`
        return (
            <Input
                name={name}
                placeholder={placeholderMessage}
                status={errors.hasOwnProperty(name) || value == undefined
                    ? "error"
                    : "default"}
                type={type ?? "text"}
                {...field} />
        )
    }

    return <>
        <Controller
            name={name}
            control={control}
            rules={{ required: true, message: "the field is required" }}
            render={fieldRender} />
    </>
}

const ControlInputFormItem = ({ label, name, control, type, errors }) => <>
    <Form.Item label={label} required>
        <ControllerInput name={name} control={control} type={type} errors={errors} />
    </Form.Item>
</>

export const CarForm = ({ control, errors }) => <>
    <Form
        labelCol={{
            span: 5
        }}
        wrapperCol={{
            span: 14
        }}
        layout="horizontal"
        style={{
            maxWidth: 600
        }}
    >
        <ControlInputFormItem label='Name' name='name' control={control} errors={errors} />
        <ControlInputFormItem label='Description' name='description' control={control} errors={errors} />
        <ControlInputFormItem label='Price' name='price' control={control} type={"number"} errors={errors} />
        <ControlInputFormItem label='Image URL' name='image' control={control} errors={errors} />
    </Form>
</>