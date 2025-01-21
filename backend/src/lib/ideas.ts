import _ from 'lodash'

export const ideas = _.times(10, (i) => ({
  nick: `cool-idea-nick-${i}`,
  name: `Idea ${i}`,
  description: `Description of idea ${i}...`,
  text: _.times(10, (j) => `<p>Text paragrph ${j} of idea ${i}...</p>`).join(''),
}))
