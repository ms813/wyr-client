import PropTypes from 'prop-types';

const QuestionsType = PropTypes.arrayOf(
    PropTypes.shape({
        options: PropTypes.object,
        player: PropTypes.string
    })
);

const OptionType = PropTypes.shape({
    text: PropTypes.string,
    voterIds: PropTypes.arrayOf(PropTypes.string)
});

const OptionsType = PropTypes.shape({
    a: OptionType,
    b: OptionType
});

export {QuestionsType, OptionsType};
