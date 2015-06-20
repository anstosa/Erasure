'use strict';

var DEPENDENCIES = ['$http', '$scope', 'Books'];

function ErasureCtrl($http, $scope, Books) {
    $scope.Books = Books;

    $scope.bookIndex = 0;
    $scope.$watch('bookIndex', function(index) {
        $scope.book = Books[index];
    });

    $scope.paragraphCount = 3;
    $scope.source = [['It','was','a','week','or','two','after','the','last','whaling','scene','recounted,','and','when','we','were','slowly','sailing','over','a','sleepy,','vapoury,','mid-day','sea,','that','the','many','noses','on','the','Pequod\'s','deck','proved','more','vigilant','discoverers','than','the','three','pairs','of','eyes','aloft.','A','peculiar','and','not','very','pleasant','smell','was','smelt','in','the','sea.'],['\'I','will','bet','something','now,\'','said','Stubb,','\'that','somewhere','hereabouts','are','some','of','those','drugged','whales','we','tickled','the','other','day.','I','thought','they','would','keel','up','before','long.\''],['Presently,','the','vapours','in','advance','slid','aside;','and','there','in','the','distance','lay','a','ship,','whose','furled','sails','betokened','that','some','sort','of','whale','must','be','alongside.','As','we','glided','nearer,','the','stranger','showed','French','colours','from','his','peak;','and','by','the','eddying','cloud','of','vulture','sea-fowl','that','circled,','and','hovered,','and','swooped','around','him,','it','was','plain','that','the','whale','alongside','must','be','what','the','fishermen','call','a','blasted','whale,','that','is,','a','whale','that','has','died','unmolested','on','the','sea,','and','so','floated','an','unappropriated','corpse.','It','may','well','be','conceived,','what','an','unsavory','odor','such','a','mass','must','exhale;','worse','than','an','Assyrian','city','in','the','plague,','when','the','living','are','incompetent','to','bury','the','departed.','So','intolerable','indeed','is','it','regarded','by','some,','that','no','cupidity','could','persuade','them','to','moor','alongside','of','it.','Yet','are','there','those','who','will','still','do','it;','notwithstanding','the','fact','that','the','oil','obtained','from','such','subjects','is','of','a','very','inferior','quality,','and','by','no','means','of','the','nature','of','attar-of-rose.']];
    $scope.updateSource = function() {
        if (_.keys($scope.marked).length > 0) {
            // TODO: Confirm
            console.warn('You lost changes');
            $scope.marked = {};
        }
        $http.get('/books/' + $scope.book.path).then(function(response) {
            var source = _.chain(response.data.split('\r\n\r\n'))
                .each(function(paragraph, index, list) {
                    list[index] = _.clean(paragraph).split(/\r\n| /);
                })
                .omit(function(paragraph) {
                    return (paragraph.length < 15);
                })
                .toArray()
                .value();

            $scope.source = [];
            var start = Math.floor(
                Math.random() * source.length - $scope.paragraphCount
            );
            for (var i = 0; i < $scope.paragraphCount; i++) {
                $scope.source.push(source[start + i]);
            }
        });
    };

    var lastAction;
    $scope.marked = {0:{0:true,1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true,9:true,10:true,11:true,12:true,13:true,18:true,19:true,20:true,21:true,22:true,23:true,24:true,25:true,26:true,27:true,28:true,29:true,30:true,31:true,32:true,33:true,35:true,36:true,37:true,38:true,39:true,40:true,41:true,42:true,52:true,53:true,54:true},1:{0:true,1:true,2:true,3:true,4:true,5:true,6:true,7:true,8:true,9:true,10:true,11:true,12:true,13:true,14:true,15:true,16:true,17:true,18:true,19:true,20:true,21:true,22:true,23:true,24:true,25:true,26:true,27:true,28:true},2:{0:true,3:true,4:true,5:true,6:true,8:true,9:true,10:true,11:true,12:true,13:true,14:true,15:true,16:true,17:true,18:true,19:true,24:true,25:true,26:true,27:true,28:true,31:true,32:true,33:true,34:true,35:true,36:true,37:true,38:true,39:true,40:true,41:true,42:true,43:true,44:true,45:true,46:true,47:true,48:true,49:true,53:true,54:true,55:true,56:true,57:true,58:true,59:true,60:true,61:true,62:true,63:true,64:true,67:true,68:true,69:true,70:true,71:true,72:true,73:true,74:true,75:true,78:true,79:true,80:true,81:true,88:true,89:true,90:true,91:true,92:true,93:true,94:true,95:true,96:true,97:true,98:true,99:true,100:true,101:true,102:true,103:true,104:true,105:true,106:true,107:true,108:true,109:true,110:true,115:true,116:true,117:true,118:true,119:true,120:true,121:true,122:true,123:true,124:true,125:true,126:true,127:true,128:true,129:true,130:true,131:true,132:true,133:true,134:true,135:true,136:true,137:true,147:true,148:true,149:true,150:true,151:true,152:true,153:true,154:true,155:true,156:true,157:true,158:true,159:true,160:true,161:true,162:true,163:true,164:true,165:true,166:true,167:true,168:true,169:true,170:true,171:true}};
    $scope.tool = 'pencil';
    $scope.$watch('tool', function() {
        lastAction = null;
    });
    $scope.action = function($event, paragraphIndex, wordIndex) {
        var action;
        switch($scope.tool) {
        case 'pencil':
            action = mark;
            break;
        case 'eraser':
            action = erase;
            break;
        }
        if ($event.shiftKey && lastAction) {
            _.each($scope.source, function(p, pIndex) {
                if (
                    pIndex >= Math.min(paragraphIndex, lastAction.paragraphIndex) &&
                    pIndex <= Math.max(paragraphIndex, lastAction.paragraphIndex)
                ) {
                    _.each(p, function(w, wIndex) {
                        if (paragraphIndex === lastAction.paragraphIndex) {
                            if (
                                wIndex >= Math.min(wordIndex, lastAction.wordIndex) &&
                                wIndex <= Math.max(wordIndex, lastAction.wordIndex)
                            ) {
                                action.call(this, pIndex, wIndex);
                            }
                        }
                        else {
                            var isForward = (
                                paragraphIndex > lastAction.paragraphIndex ||
                                (
                                    paragraphIndex === lastAction.paragraphIndex &&
                                    wordIndex >= lastAction.wordIndex
                                )
                            );
                            if ((
                                pIndex === Math.min(paragraphIndex, lastAction.paragraphIndex) &&
                                wIndex >= (isForward ? lastAction.wordIndex : wordIndex)
                            ) || (
                                pIndex === Math.max(paragraphIndex, lastAction.paragraphIndex) &&
                                wIndex <= (isForward ? wordIndex : lastAction.wordIndex)
                            ) ||
                                !_.contains([paragraphIndex, lastAction.paragraphIndex], pIndex)
                            ) {
                                action.call(this, pIndex, wIndex);
                            }
                        }
                    });
                }
            });
        }
        else {
            action.call(this, paragraphIndex, wordIndex);
        }

        lastAction = {
            paragraphIndex: paragraphIndex,
            wordIndex: wordIndex
        };
    };

    function mark(paragraphIndex, wordIndex) {
        var paragraph = $scope.marked[paragraphIndex];
        if (!paragraph) {
            paragraph = $scope.marked[paragraphIndex] = {};
        }

        paragraph[wordIndex] = true;
    }

    function erase(paragraphIndex, wordIndex) {
        var paragraph = $scope.marked[paragraphIndex];
        if (!paragraph) {
            paragraph = $scope.marked[paragraphIndex] = {};
        }

        delete paragraph[wordIndex];

        if (_.keys(paragraph).length === 0) {
            delete $scope.marked[paragraphIndex];
        }
    }
}

ErasureCtrl.$inject = DEPENDENCIES;

angular.module('erasure').controller('ErasureCtrl', ErasureCtrl);
