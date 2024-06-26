import { getAnswers } from "@/lib/actions/asnwer.action";
import React from "react";
import SearchFilter from "./search/SearchFilter";
import { AnswerFilters } from "@/constants";
import Link from "next/link";
import Image from "next/image";
import { getTimestamp } from "@/lib/utils";
import ParseHTML from "../ParseHTML";
import Voting from "./Voting";
import Pagination from "./Pagination";

interface props {
  questionId: string;
  userId?: string;
  searchParams: { [key: string]: string | undefined };
}

const AllAnswers = async ({ questionId, userId, searchParams }: props) => {
  const filter = searchParams?.filter;
  const page = searchParams?.page;

  const result = await getAnswers({
    questionId: JSON.parse(questionId),
    filter,
    page: page ? Number(page) : 1,
    pageSize: 15,
  });

  return (
    <div className="mt-11">
      <div className="flex items-center justify-between">
        <h3 className="primary-text-gradient">
          {result.answers.length} Answer(s)
        </h3>
        <SearchFilter
          filters={AnswerFilters}
          path={`/question/${questionId}`}
        />
      </div>
      <div>
        {result.answers.map((answer: any) => (
          <article className="light-border border-b py-10" key={answer._id}>
            <div className="flex items-center justify-between">
              <div className="mb-8 flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2 w-full">
                <Link
                  href={`/profile/${answer.author.clerkId}`}
                  className="flex flex-1 items-start gap-1 sm:items-center"
                >
                  <Image
                    src={answer.author.picture}
                    alt="User Image"
                    width={18}
                    height={18}
                    className="rounded-full object-cover max-sm:mt-0.5"
                  />
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <p className="body-semibold text-dark300_light700">
                      {answer.author.username}
                    </p>
                    <p className="small-regular text-light400_light500 mt-0.5 line-clamp-1 ml-1">
                      answered {getTimestamp(answer.createdAt)}
                    </p>
                  </div>
                </Link>
                <div className="flex justify-end">
                  <Voting
                    userId={userId}
                    questionId={questionId}
                    answerId={JSON.stringify(answer._id)}
                    upvotes={answer.upvotes.length}
                    downvotes={answer.downvotes.length}
                    liked={
                      userId
                        ? answer.upvotes.includes(JSON.parse(userId))
                        : false
                    }
                    disliked={
                      userId
                        ? answer.downvotes.includes(JSON.parse(userId))
                        : false
                    }
                  />
                </div>
              </div>
            </div>
            <ParseHTML data={answer.content} />
          </article>
        ))}
      </div>
      <Pagination
        pageNumber={searchParams?.page ? +searchParams.page : 1}
        currentViewFull={result.isNext}
      />
    </div>
  );
};

export default AllAnswers;
