import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

export function SelectPortpolio() {
	return (
		<Select>
			<SelectTrigger className="w-[200px]">
				<SelectValue placeholder="포트폴리오 불러오기" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>내 포트폴리오 목록</SelectLabel>
					<SelectItem value="레이달리오">레이달리오 포트폴리오</SelectItem>
					<SelectItem value="그레그 포트폴리오">그레그 포트폴리오</SelectItem>
					<SelectItem value="프리가바 포트폴리오">
						프리가바 포트폴리오
					</SelectItem>
					<SelectItem value="필라인 포트폴리오">필라인 포트폴리오</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
