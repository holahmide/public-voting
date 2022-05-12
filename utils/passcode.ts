import generator from 'generate-password';

const passcodeGenerator = (length = 12) => {
    return generator.generate({
        length,
        numbers: true
    });
};

export default {
  passcodeGenerator,
};
