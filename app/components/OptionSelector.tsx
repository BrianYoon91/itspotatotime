import { Field, Label, Select } from "@headlessui/react";
import { Genre } from "../constant";

interface optionProps {
	text: string;
	optionData: Genre[];
	type: string;
	onPick?: (genreId: string | number, type: string) => void;
}
export const OptionSelector = ({
	text,
	optionData,
	onPick,
	type,
}: optionProps) => {
	return (
		<Field className="flex flex-col border rounded-2xl p-2 cursor-pointer">
			<Label className="text-center">{text}</Label>
			<Select
				onChange={(e) => {
					onPick?.(e.target.value, type);
				}}
				className="cursor-pointer"
				name="genres"
				aria-label="Pick a genre"
			>
				{optionData.map((option, index) => (
					<option className="bg-black" key={index} value={option.id}>
						{option.name}
					</option>
				))}
			</Select>
		</Field>
	);
};
