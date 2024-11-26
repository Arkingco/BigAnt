import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator,
} from '@/components/ui/command';
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { SelectPortpolio } from './SelectPortpolio';

export default function ProfileSidebar() {
	return (
		<div className="flex flex-col gap-y-10 p-[10px]">
			<Command className="rounded-lg border shadow-md">
				<CommandInput placeholder="검색어를 입력해주세요" />
				<CommandList>
					<CommandEmpty>결과를 찾을 수 없습니다.</CommandEmpty>
					<CommandGroup heading="주식">
						<CommandItem>
							<span>삼성전자</span>
						</CommandItem>
						<CommandItem>
							<span>삼성 증권</span>
						</CommandItem>
						<CommandItem>
							<span>삼성 화재</span>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
					<CommandGroup heading="관련 게시글">
						<CommandItem>
							<span>삼성 전자 무슨...</span>
						</CommandItem>
						<CommandItem>
							<span>삼성 5만 전자...</span>
						</CommandItem>
						<CommandItem>
							<span>그래 삼성 나는...</span>
						</CommandItem>
					</CommandGroup>
				</CommandList>
			</Command>
			<div className="flex flex-col gap-2">
				<Card className="w-full">
					<CardHeader>
						<CardTitle>화제의 주식</CardTitle>
						<CardDescription>사람들이 관심 있는 주식 목록</CardDescription>
					</CardHeader>
					<CardContent>
						<div className=" flex flex-col gap-y-1 text-[18px]">
							<p>😀 삼성 전자 1000만</p>
							<p>😷 LG 화학 2000만</p>
							<p>🤥 테슬라 3000만</p>
							<p>🤕 엔비디아 4000만</p>
						</div>
					</CardContent>
				</Card>
				<Dialog>
					<DialogTrigger>
						<Button className="text-[24px] h-[50px] w-full">글 작성</Button>
					</DialogTrigger>
					<DialogContent className="min-w-[50%]">
						<div className="flex flex-col gap-4">
							<div className="flex flex-row items-center gap-2">
								<div className="w-[75px] h-[75px] rounded-full bg-red-300"></div>
								<div className="text-[32px]">user</div>
							</div>
							<Textarea
								placeholder="내용을 입력해 주세요"
								className="min-h-[500px] text-[18px]"
							></Textarea>
						</div>
						<DialogFooter>
							<div className="flex flex-row justify-between w-full">
								<SelectPortpolio />
								<Button variant="outline" type="submit">
									저장
								</Button>
							</div>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
