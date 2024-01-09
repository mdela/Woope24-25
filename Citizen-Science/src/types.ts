// Props for Custom Button creation
export type ButtonProps = {
    label: string;
    labelColor: string;
    backgroundColor?: string;
    onPress: () => void;
    position: { horizontal: number | string; vertical: number | string};
    borderRadius?: number;
    borderColor?: string;
    borderWidth?: number;
    disabled?: boolean;
    textSizeMultiplier?: number;
};

//Props for Custom TextField Creation
export type TextFieldProps = {
    placeholder: string;
    value: string;
    onChangeText: (text: string) => void;
    secureTextEntry?: boolean;
    borderColor?: string;
    borderRadius?: number;
    position: { horizontal: number | string; vertical: number | string};
};

export type LogoNameProps = {
    position: 'topLeft' | 'bottomRight' ;
    color: string;
};

export type BlobProps = {
    // Rotation is not required because it is randomized in the Blob component
    rotationDeg?: string; // Format: '45deg'
    image?: string;
    width: number;
    height: number;
    position: { horizontal: number | string; vertical: number | string } ;

};

export type TitleProps = {
    text: string;
    fontSize: number;
    textStyle: 'title' | 'subtitle';
    color: string;
    position: { horizontal: number, vertical: number };
};