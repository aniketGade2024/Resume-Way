import { z } from "zod";

export const GenerateQuestionsPayload = z.object({
    report: z.string()
})

export const CandidateSchema = z.object({
    name: z.string(),
    role: z.string(),
    skills: z.array(z.string()),
    years_of_experience: z.number()
});

const QuestionsSchema = z.array(z.string());
const SoftSkillsQuestionsSchema = z.array(z.string());
const TechnicalQuestionsSchema = z.array(z.string());

export const OutputSchema = z.object({
    candidate: CandidateSchema,
    questions: QuestionsSchema,
    soft_skills_questions: SoftSkillsQuestionsSchema,
    technical_questions: TechnicalQuestionsSchema
});

export const GenerateQuestionResponseSchema = z.object({
    model: z.string(),
    success: z.boolean(),
    error: z.boolean(),
    output: OutputSchema
});
