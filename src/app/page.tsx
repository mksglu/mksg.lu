import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CommandMenu } from "@/components/command-menu";
import { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { GlobeIcon, MailIcon, PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RESUME_DATA } from "@/data/resume-data";
import Image from "next/image";
import Link from "next/link";
import { XIcon, LinkedInIcon } from "@/components/icons";

import Mert from "@/images/pp-mert.jpg";
export default function Page() {
  return (
    <main className="container relative mx-auto scroll-my-12 overflow-auto p-4 print:p-0 md:p-16">
      <section className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-1.5">
            <h1 className="text-2xl font-bold">{RESUME_DATA.name}</h1>
            <p className="max-w-md text-pretty font-mono text-sm text-muted-foreground print:text-[12px]">
              {RESUME_DATA.about}
            </p>
            <p className="max-w-md items-center text-pretty font-mono text-xs text-muted-foreground">
              <a
                className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline"
                href={RESUME_DATA.locationLink}
                target="_blank"
              >
                <GlobeIcon className="size-3" />
                {RESUME_DATA.location}
              </a>
            </p>
            <div className="flex gap-x-1 pt-1 font-mono text-sm text-muted-foreground print:hidden">
              {RESUME_DATA.contact.email ? (
                <Button
                  className="size-8"
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <a href={`mailto:${RESUME_DATA.contact.email}`}>
                    <MailIcon className="size-4" />
                  </a>
                </Button>
              ) : null}
              {RESUME_DATA.contact.social.map((social) => (
                <Button
                  key={social.name}
                  className="size-8"
                  variant="outline"
                  size="icon"
                  asChild
                >
                  <a href={social.url}>
                    <social.icon className="size-4" />
                  </a>
                </Button>
              ))}
              <Button className="size-8" variant="outline" size="icon" asChild>
                <a
                  href="https://cal.com/mksglu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GlobeIcon className="size-4" />
                </a>
              </Button>
            </div>
            <div className="hidden flex-col gap-y-1 font-mono text-sm text-muted-foreground print:flex">
              {RESUME_DATA.contact.email ? (
                <a
                  href={`mailto:${RESUME_DATA.contact.email}`}
                  className="inline-flex items-center gap-x-2"
                >
                  <MailIcon className="size-3" />
                  <span>{RESUME_DATA.contact.email}</span>
                </a>
              ) : null}
              {RESUME_DATA.contact.social.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="inline-flex items-center gap-x-2"
                >
                  <social.icon className="size-3" />
                  <span>{social.url}</span>
                </a>
              ))}
              <span className="inline-flex items-center gap-x-2">
                <GlobeIcon className="size-3" />
                {RESUME_DATA.personalWebsiteUrl}
              </span>
              <a
                href="https://cal.com/mksglu"
                className="inline-flex items-center gap-x-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GlobeIcon className="size-3" />
                <span>https://cal.com/mksglu</span>
              </a>
            </div>
          </div>

          <Avatar className="size-28">
            <Image src={Mert} alt="Mert Köseoğlu" />
            <AvatarFallback>{RESUME_DATA.initials}</AvatarFallback>
          </Avatar>
        </div>
        <Section>
          <h2 className="text-xl font-bold">About</h2>
          <p className="text-pretty font-mono text-sm text-muted-foreground print:text-[12px]">
            {RESUME_DATA.summary}
          </p>
        </Section>
        {/* <Section className="print:break-inside-avoid">
          <h2 className="text-xl font-bold">Skills</h2>
          <div className="flex flex-wrap gap-1">
            {RESUME_DATA.skills.map((skill) => {
              return (
                <Badge className="print:text-[10px]" key={skill}>
                  {skill}
                </Badge>
              );
            })}
          </div>
        </Section> */}
        <Section>
          <h2 className="text-xl font-bold">Work Experience</h2>
          {RESUME_DATA.work.map((work, index) => {
            return (
              <Card key={`${work.company}-${index}`} className="print:break-inside-avoid">
                <CardHeader>
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none">
                      <a className="hover:underline" href={work.link}>
                        {work.company}
                      </a>

                      <span className="inline-flex gap-x-1">
                        {work.badges.map((badge) => (
                          <Badge
                            variant="secondary"
                            className="align-middle text-xs print:px-1 print:py-0.5 print:text-[8px] print:leading-tight"
                            key={badge}
                          >
                            {badge}
                          </Badge>
                        ))}
                      </span>
                    </h3>
                    <div className="text-sm tabular-nums text-gray-500 print:text-[10px]">
                      {work.start} - {work.end ?? "Present"}
                    </div>
                  </div>

                  <h4 className="font-mono text-sm leading-none print:text-[12px]">
                    {work.title}
                  </h4>
                </CardHeader>
                <CardContent className="mt-2">
                  {"description" in work && work.description && (
                    <p className="text-xs text-muted-foreground mb-2 print:text-[10px]">
                      {work.description}
                    </p>
                  )}
                  <ul className="list-disc list-inside space-y-1 text-xs print:text-[10px]">
                    {work.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="text-muted-foreground">
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </Section>
        <Section className="print:break-inside-avoid">
          <h2 className="text-xl font-bold">Projects</h2>
          {RESUME_DATA.projects.map((project) => {
            return (
              <Card key={project.title} className="print:break-inside-avoid">
                <CardHeader>
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none">
                      {"link" in project && project.link.href !== "#" ? (
                        <a className="hover:underline" href={project.link.href} target="_blank">
                          {project.title}
                        </a>
                      ) : (
                        project.title
                      )}
                    </h3>
                    {"link" in project && project.link.href !== "#" && (
                      <div className="text-xs tabular-nums text-gray-500 print:text-[10px]">
                        {project.link.label}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {project.techStack.slice(0, 5).map((tech) => (
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-1 py-0 print:px-1 print:py-0.5 print:text-[8px] print:leading-tight"
                        key={tech}
                      >
                        {tech}
                      </Badge>
                    ))}
                    {project.techStack.length > 5 && (
                      <Badge
                        variant="secondary"
                        className="text-[10px] px-1 py-0 print:px-1 print:py-0.5 print:text-[8px] print:leading-tight"
                      >
                        +{project.techStack.length - 5}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="mt-2 text-xs print:text-[10px]">
                  {project.description}
                </CardContent>
              </Card>
            );
          })}
        </Section>
        <Section className="print:break-inside-avoid">
          <h2 className="text-xl font-bold">Blog & Insights</h2>
          <div className="space-y-2">
            {RESUME_DATA.blogPosts.map((post, index) => (
              <div key={index} className="border-l-2 border-muted pl-3 py-1">
                {"slug" in post && post.slug ? (
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-sm font-medium hover:underline"
                  >
                    {post.title}
                  </Link>
                ) : (
                  <p className="text-sm font-medium">{post.title}</p>
                )}
                <p className="text-xs text-muted-foreground mt-0.5 print:text-[10px]">
                  {post.description}
                </p>
                <div className="flex gap-3 mt-1">
                  {"slug" in post && post.slug && (
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:underline print:hidden"
                    >
                      <span>Read more &rarr;</span>
                    </Link>
                  )}
                  <a
                    href={post.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:underline"
                  >
                    <LinkedInIcon className="size-3" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={post.xUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:underline"
                  >
                    <XIcon className="size-3" />
                    <span>X</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Section>
        <Section>
          <h2 className="text-xl font-bold">Recommendations</h2>
          <div className="space-y-3">
            {RESUME_DATA.recommendations.map((recommendation) => (
              <div key={`${recommendation.name}-${recommendation.date}`} className="border-l-2 border-muted pl-3 py-1 print:break-inside-avoid">
                <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
                  {recommendation.linkedIn ? (
                    <a
                      href={recommendation.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-sm hover:underline"
                    >
                      {recommendation.name}
                    </a>
                  ) : (
                    <span className="font-semibold text-sm">{recommendation.name}</span>
                  )}
                  <span className="text-xs text-muted-foreground">{recommendation.title}</span>
                </div>
                <p className="text-xs text-muted-foreground/80 mt-0.5 italic print:text-[10px]">
                  {recommendation.relationship} • {recommendation.date}
                </p>
                <p className="text-xs text-muted-foreground mt-1.5 print:text-[10px]">
                  &ldquo;{recommendation.content}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </Section>
      </section>

      <CommandMenu
        links={[
          {
            url: RESUME_DATA.personalWebsiteUrl,
            title: "Personal Website",
          },
          ...RESUME_DATA.contact.social.map((socialMediaLink) => ({
            url: socialMediaLink.url,
            title: socialMediaLink.name,
          })),
        ]}
      />
      <a
        href="https://esenbogaresidence.com"
        style={{ display: "none" }}
        rel="noopener noreferrer"
      >
        Ankara Esenboğa Airport Aparthotel - Luxury Rental
      </a>
    </main>
  );
}
