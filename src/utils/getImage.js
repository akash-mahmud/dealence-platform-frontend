import { image_uri } from "../config/secrets";

export const getImage = (key) => {
	if (key) {
		return image_uri + key;
	} else {
		return '';
	}
};
