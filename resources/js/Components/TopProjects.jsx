import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { TrendingUp, Star, Github } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function TopProjects({ topRepos }) {
    return (<Card className="border-none shadow-sm flex flex-col">
        <CardHeader className="pb-4 p-5">
            <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-yellow-500" />
                أهم المشاريع الموثقة
            </CardTitle>
            <CardDescription>المشاريع الأكثر شهرة لمطورين كودكس</CardDescription>
        </CardHeader>
        <CardContent className="space-y-0 p-0">
            {topRepos.map((repo, index) => (
                <div
                    key={repo.id}
                    className="flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors border-b last:border-0"
                >
                    <div className="flex-none font-bold text-muted-foreground/30 text-xl w-6">
                        {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                            <a
                                href={repo.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-mono text-[13px] font-bold truncate tracking-tight hover:text-primary transition-colors cursor-pointer"
                            >
                                {repo.name}
                            </a>
                            <div className="flex items-center gap-0.5 text-yellow-500 bg-yellow-500/10 px-1.5 py-0.5 rounded text-[10px]">
                                <Star className="w-3 h-3 fill-current" />
                                {repo.stars}
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-[10px] text-muted-foreground">بواسطة</span>
                            <Link
                                href={`/@${repo.user.username}`}
                                className="text-[10px] font-semibold text-primary truncate hover:underline"
                            >
                                @{repo.user.username}
                            </Link>
                        </div>
                    </div>
                    <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors shrink-0 cursor-pointer"
                    >
                        <Github className="w-4 h-4" />
                    </a>
                </div>
            ))}
        </CardContent>
    </Card>);
}