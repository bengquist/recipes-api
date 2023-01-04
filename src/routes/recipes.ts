import { Request, Response } from "express";
import puppeteer from "puppeteer";

export const recipeController = {
  save: async (req: Request, res: Response) => {
    const selector = ".wprm-recipe-name";
    const url = String(req.query.url);
    console.log(url);
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    await page.waitForSelector(selector);

    const content = await page.evaluate(() => {
      return {
        title: document.querySelector(".wprm-recipe-name")?.textContent,
        description: document.querySelector(".wprm-recipe-summary")
          ?.textContent,
        prepTime: document.querySelector(".wprm-recipe-prep_time")?.textContent,
        cookTime: document.querySelector(".wprm-recipe-cook_time")?.textContent,
        totalTime: document.querySelector(".wprm-recipe-total_time")
          ?.textContent,
        course: document.querySelector(".wprm-recipe-course")?.textContent,
        cuisine: document.querySelector(".wprm-recipe-cuisine")?.textContent,
        diet: document.querySelector(".wprm-recipe-suitablefordiet")
          ?.textContent,
        servingSize: document.querySelector(".wprm-recipe-servings")
          ?.textContent,
        url: "",
        images: [...document.querySelectorAll(".wp-block-image")].map(
          (image) => {
            return image.querySelector("img")?.getAttribute("src");
          }
        ),
        ingredients: [
          ...document.querySelectorAll(".wprm-recipe-ingredient"),
        ].map((ingredient) => {
          return {
            name: ingredient.querySelector(".wprm-recipe-ingredient-name")
              ?.textContent,
            amount: ingredient.querySelector(".wprm-recipe-ingredient-amount")
              ?.textContent,
            unit: ingredient.querySelector(".wprm-recipe-ingredient-unit")
              ?.textContent,
            note: ingredient.querySelector(".wprm-recipe-ingredient-notes")
              ?.textContent,
          };
        }),
        instructions: [
          ...document.querySelectorAll(".wprm-recipe-instruction"),
        ].map((instruction) => {
          return {
            text: instruction.querySelector(".wprm-recipe-instruction-text")
              ?.textContent,
          };
        }),
        notes: [...document.querySelectorAll(".wprm-recipe-notes")].map(
          (note) => {
            return note?.textContent;
          }
        ),
      };
    });

    console.log(content);

    res.send(true);
  },
};
