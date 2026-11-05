/* Inference Practice: what a writer implies but does not say, in academic and everyday texts. */
(function () {
  'use strict';
  const STEPS = [['Find the evidence', 'Locate the sentences the question is about.'], ['Ask what must follow', 'An inference must be true if the text is true. "Might be true" is not enough.'], ['Beware of outside knowledge', 'The answer comes from the text, not from what you know about the topic.'], ['Watch extreme words', 'Choices with always, never or all are usually too strong.']];
  const items = (data) => SK.passageItems(data.toefl_passages).concat(data.daily_texts.flatMap((t) => t.questions.map((q) => Object.assign({ stem: '' }, q, { passage: t.text, passageTitle: t.kind + ': ' + t.title, group: t.id })))).filter((x) => x.topic === 'Inference').map((x) => Object.assign(x, { topic: data.daily_texts.some((t) => t.id === x.group) ? 'Everyday texts' : 'Academic passages' }));
  const App = {
    about: 'Inference questions ask what a text suggests without stating it. They are among the hardest TOEFL reading questions because the answer is never in the text word for word. This app collects every inference question from the suite\'s academic passages and everyday texts, with a four-step method.',
    how: ['Learn the method in **Method**.', 'Practise in **Practice**, choosing academic or everyday texts.', 'For each answer, point to the sentence that proves it.'],
    tabs: [
      SK.bankTab('practice', 'Practice', (ctx) => items(ctx.data), { sizes: [4, 8, 12] }),
      { id: 'method', label: 'Method', render(el) { el.appendChild(SK.card('A four-step method', SK.table(['Step', 'How'], STEPS, false))); } },
    ],
    items,
    checks: { 'inference questions come from both kinds of text': (data, assert) => {
      const all = items(data);
      assert.ok(all.length >= 10);
      assert.deepEqual([...new Set(all.map((x) => x.topic))].sort(), ['Academic passages', 'Everyday texts']);
      for (const it of all) assert.deepEqual(SK.validateItem(it), []);
    } },
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = App; else SK.start(App);
})();
